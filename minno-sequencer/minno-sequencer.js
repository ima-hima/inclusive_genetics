(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('lodash')) :
	typeof define === 'function' && define.amd ? define(['lodash'], factory) :
	(global['minno-sequencer'] = factory(global._));
}(this, (function (_) { 'use strict';

_ = _ && _.hasOwnProperty('default') ? _['default'] : _;

/**
 * A function that maps a mixer object into a sequence.
 *
 * The basic structure of such an obect is:
 * {
 *		mixer: 'functionType',
 *		remix : false,
 *		data: [task1, task2]
 *	}
 *
 * The results of the mix are set into `$parsed` within the original mixer object.
 * if remix is true $parsed is returned instead of recomputing
 *
 * @param {Object} [obj] [a mixer object]
 * @returns {Array} [An array of mixed objects]
 */

mixProvider.$inject = ['randomizeShuffle', 'randomizeRandom'];
function mixProvider(shuffle, random){

    function mix(obj){
        var mixerName = obj.mixer;

        // if this isn't a mixer
        // make sure we catch mixers that are set with undefined by accident...
        if (!(_.isPlainObject(obj) && 'mixer' in obj)){
            return [obj];
        }

        if (_.isUndefined(mix.mixers[mixerName])){
            throw new Error('Mixer: unknow mixer type = ' + mixerName);
        }

        if (!obj.remix && obj.$parsed) {
            return obj.$parsed;
        }

        obj.$parsed = mix.mixers[mixerName].apply(null, arguments);

        if (!_.isArray(obj.$parsed)) {
            throw new Error('Mixer: mixers must return an array (mixer: ' + mixerName + ')');
        }

        return obj.$parsed;
    }

    function deepMixer(sequence, context){
        return _.reduce(sequence, function(arr,value){

            if (_.isPlainObject(value) && 'mixer' in value && value.mixer != 'wrapper' && !value.wrapper){
                var seq = deepMixer(mix(value, context), context);
                return arr.concat(seq);
            } else {
                return arr.concat([value]);
            }
        }, []);
    }


    mix.mixers = {
        wrapper : function(obj){
            return obj.data;
        },

        repeat: function(obj){
            var sequence = obj.data || [];
            var result = [], i;
            for (i=0; i < obj.times; i++){
                result = result.concat(_.clone(sequence,true));
            }
            return result;
        },

        // randomize any elements
        random: function(obj, context){
            var sequence = obj.data ? deepMixer(obj.data, context) : [];
            return shuffle(sequence);
        },

        choose: function(obj, context){
            var sequence = obj.data ? deepMixer(obj.data, context) : [];
            return _.take(shuffle(sequence), obj.n ? obj.n : 1);
        },

        custom: function(obj, context){
            return _.isFunction(obj.fn) ? obj.fn(obj, context) : [];
        },

        weightedRandom: weightedChoose,
        weightedChoose: weightedChoose

    };


    return mix;

    function weightedChoose(obj, context){
        var sequence = obj.data ? deepMixer(obj.data, context) : [];
        var i;
        var n = obj.n || 1;
        var result = [];
        var total_weight = _.reduce(obj.weights,function (prev, cur) {
            return prev + cur;
        });

        for (i = 0; i < n; i++){
            result.push(generate());
        }

        return result;

        function generate(){
            var i;
            var random_num = random() * total_weight; // cutoff - when we reach this sum - we've reached the desired weight
            var weight_sum = 0;

            for (i = 0; i < sequence.length; i++) {
                weight_sum += obj.weights[i];
                weight_sum = +weight_sum.toFixed(3);

                if (random_num <= weight_sum) {
                    return obj.data[i];
                }
            }

            throw new Error('Mixer: something went wrong with weightedRandom');
        }
    }

}

mixerDotNotationProvider$1.$inject = ['dotNotation'];
function mixerDotNotationProvider$1(dotNotation){

    function mixerDotNotation(chain, obj){

        var escapeSeparatorRegex= /[^/]\./;

        if (!_.isString(chain)) return chain;

        // We do not have a non escaped dot: we treat this as a string
        if (!escapeSeparatorRegex.test(chain)) return chain.replace('/.','.');

        return dotNotation(chain, obj);
    }

    return mixerDotNotation;
}

mixerConditionProvider$1.$inject = ['mixerDotNotation','piConsole'];
function mixerConditionProvider$1(dotNotation,piConsole){
    var operatorHash = {
        gt: forceNumeric(_.gt),
        greaterThan: forceNumeric(_.gt),
        gte: forceNumeric(_.gte),
        greaterThanOrEqual: forceNumeric(_.gte),
        equals: _.eq,
        'in': _.rearg(_.contains,1,0), // effectively reverse
        contains: _.rearg(_.contains,1,0), // effectively reverse
        exactly: exactly,
        isTruthy: isTruthy
    };

    function mixerCondition(condition, context){
        var operator = getOperator(condition);
        var left = dotNotation(condition.compare,context);
        var right = dotNotation(condition.to,context);

        if (condition.DEBUG) piConsole({
            type:'info',
            message:'Condition info',
            rows: [
                ['Left: ', left], 
                ['Operator: ', condition.operator || 'equals'],
                ['Right: ', right]
            ],
            context: condition,
        });

        return condition.negate
            ? !operator.apply(context,[left, right, context])
            : operator.apply(context,[left, right, context]);
    }

    return mixerCondition;


    // extract the operator function from the condition
    function getOperator(condition){
        var operator = condition.operator;
        if (_.isFunction(condition)) return condition;
        if (!_.has(condition, 'operator')) return _.has(condition,'to') ? _.eq : isTruthy;
        if (_.isFunction(operator)) return operator;
        return operatorHash[operator];
    }

    function isTruthy(left){ return !!left; }
    function exactly(left,right){ return left === right;}
    function forceNumeric(cb){ return function(left,right){ return [left,right].every(_.isNumber) ? cb(left,right) : false; }; } 

}

evaluateProvider.$inject = ['mixerCondition'];
function evaluateProvider(condition){
    /**
     * Checks if a conditions set is true
     * @param  {Array} conditions [an array of conditions]
     * @param  {Object} context   [A context for the condition checker]
     * @return {Boolean}          [Are these conditions true]
     */

    function evaluate(conditions,context){
        // make && the default
        _.isArray(conditions) && (conditions = {and:conditions});

        function test(cond){return evaluate(cond,context);}

        // && objects
        if (conditions.and){
            return _.every(conditions.and, test);
        }
        if (conditions.nand){
            return !_.every(conditions.nand, test);
        }

        // || objects
        if (conditions.or){
            return _.some(conditions.or, test);
        }
        if (conditions.nor){
            return !_.some(conditions.nor, test);
        }

        return condition(conditions, context);
    }

    return evaluate;
}

/**
 * Registers the branching mixers with the mixer
 * @return {function}         [mixer decorator]
 */

mixerBranchingDecorator$1.$inject = ['$delegate','mixerEvaluate','mixerDefaultContext'];
function mixerBranchingDecorator$1(mix, evaluate, mixerDefaultContext){

    mix.mixers.branch = branch;
    mix.mixers.multiBranch = multiBranch;

    return mix;

    /**
     * Branching mixer
     * @return {Array}         [A data array with objects to continue with]
     */
    function branch(obj, context){
        context = _.extend(context || {}, mixerDefaultContext);
        return evaluate(obj.conditions, context) ? obj.data || [] : obj.elseData || [];
    }

    /**
     * multiBranch mixer
     * @return {Array}         [A data array with objects to continue with]
     */
    function multiBranch(obj, context){
        context = _.extend(context || {}, mixerDefaultContext);
        var row;

        row = _.find(obj.branches, function(branch){
            return evaluate(branch.conditions, context);
        });

        if (row) {
            return row.data || [];
        }

        return obj.elseData || [];
    }
}

mixerSequenceProvider$1.$inject = ['mixer'];
function mixerSequenceProvider$1(mix){

    /**
     * MixerSequence takes an mixer array and allows browsing back and forth within it
     * @param {Array} arr [a mixer array]
     */
    function MixerSequence(arr){
        this.sequence = arr;
        this.stack = [];
        this.add(arr);
        this.pointer = 0;
    }

    _.extend(MixerSequence.prototype, {
        /**
         * Add sequence to mixer
         * @param {[type]} arr     Sequence
         * @param {[type]} reverse Whether to start from begining or end
         */
        add: function(arr, reverse){
            this.stack.push({pointer:reverse ? arr.length : -1,sequence:arr});
        },

        proceed: function(direction, context){
            // get last subSequence
            var subSequence = this.stack[this.stack.length-1];
            var isNext = (direction === 'next');

            // if we ran out of sequence
            // add the original sequence back in
            if (!subSequence) {
                throw new Error ('mixerSequence: subSequence not found');
            }

            subSequence.pointer += isNext ? 1 : -1;

            var el = subSequence.sequence[subSequence.pointer];

            // if we ran out of elements, go to previous level (unless we are on the root sequence)
            if (_.isUndefined(el) && this.stack.length > 1){
                this.stack.pop();
                return this.proceed.call(this,direction,context);
            }

            // if element is a mixer, mix it
            if (el && el.mixer){
                this.add(mix(el,context), !isNext);
                return this.proceed.call(this,direction,context);
            }

            // regular element or undefined (end of sequence)
            return this;
        },

        next: function(context){
            this.pointer++;
            return this.proceed.call(this, 'next',context);
        },

        prev: function(context){
            this.pointer--;
            return this.proceed.call(this, 'prev',context);
        },

        /**
         * Return current element
         * should **never** return a mixer - supposed to abstract them away
         * @return {[type]} undefined or element
         */
        current:function(){
            // get last subSequence
            var subSequence = this.stack[this.stack.length-1];

            if (!subSequence) {
                throw new Error ('mixerSequence: subSequence not found');
            }

            var el = subSequence.sequence[subSequence.pointer];

            if (!el){
                return undefined;
            }

            // extend element with meta data
            el.$meta = this.meta();

            return el;
        },

        meta: function(){
            return {
                number: this.pointer,

                // sum of sequence length, minus one (the mixer) for each level of stack except the last
                outOf:  _.reduce(this.stack, function(memo,sub){return memo + sub.sequence.length-1;},0)+1
            };
        }

    });

    return MixerSequence;
}

function dotNotation$1(chain, obj){

    if (_.isUndefined(chain)) return;
    if (_.isString(chain)) chain = chain.split('.');

    // @TODO maybe lodash _.get?
    return chain.reduce(function(result, link){

        if (_.isPlainObject(result) || _.isArray(result)){
            return result[link];
        }

        return undefined;

    }, obj);
}

piConsoleFactory$1.$inject = ['$log'];
function piConsoleFactory$1($log){
    return window.DEBUG ? piConsole : _.noop;

    function piConsole(log){
        if (_.get(piConsole,'settings.hideConsole', false)) return window.postMessage({type:'kill-console'},'*');

        $log[log.type] && $log[log.type](log.message); 
        window.postMessage(noramlizeMessage(log),'*');
    }

    function noramlizeMessage(obj){
        return _.cloneDeep(obj, normalize);
        function normalize(val){
            if (_.isFunction(val)) return val.toString();
            if (_.isError(val)) return {name:val.name, message:val.message, stack:val.stack};
        }
    }
}

var piConsole$1 = piConsoleFactory$1(console);
var mixer = mixProvider(
    _.shuffle, // randomizeShuffle
    Math.random // randomizeRandom
);

var mixerDotNotation = mixerDotNotationProvider$1(dotNotation$1);
var mixerCondition = mixerConditionProvider$1(
    mixerDotNotation,
    piConsole$1
);

var mixerEvaluate = evaluateProvider(mixerCondition);

var mixerDefaultContext = {};

mixerBranchingDecorator$1(
    mixer,
    mixerEvaluate,
    mixerDefaultContext
);

var MixerSequence = mixerSequenceProvider$1(mixer);

templateObjProvider$1.$inject = ['templateDefaultContext'];
function templateObjProvider$1(templateDefaultContext){

    function templateObj(obj, context, options){
        var skip = _.get(options, 'skip', []);
        var result = {};
        var key;
        var ctx = _.assign({}, context, templateDefaultContext);

        for (key in obj){
            result[key] = (skip.indexOf(key) == -1) ? expand(obj[key]) : obj[key];
        }

        return result;

        function expand(value){
            if (_.isString(value)) return template(value);
            if (_.isArray(value)) return value.map(expand);
            if (_.isPlainObject(value)) return _.mapValues(value, expand);
            return value;
        }

        function template(input){
            // if there is no template just return the string
            if (!~input.indexOf('<%')) return input;
            return _.template(input)(ctx);
        }
    }

    return templateObj;
}

var templateObj = templateObjProvider$1({});

/*
 * The constructor for an Array wrapper
 */

function collectionService(){

    function Collection (arr) {
        if (arr instanceof Collection) {
            return arr;
        }

        // Make sure we are creating this array out of a valid argument
        if (!_.isUndefined(arr) && !_.isArray(arr) && !(arr instanceof Collection)) {
            throw new Error('Collections can only be constructed from arrays');
        }

        this.collection = arr || [];
        this.length = this.collection.length;

        // pointer to the current location within the array
        // we start with -1 so that the initial next points to the begining of the array
        this.pointer = -1;
    }

    _.extend(Collection.prototype,{

        first : function first(){
            this.pointer = 0;
            return this.collection[this.pointer];
        },

        last : function last(){
            this.pointer = this.collection.length - 1;
            return this.collection[this.pointer];
        },

        end : function end(){
            this.pointer = this.collection.length;
            return undefined;
        },

        current : function(){
            return this.collection[this.pointer];
        },

        next : function(){
            return this.collection[++this.pointer];
        },

        previous : function(){
            return this.collection[--this.pointer];
        },

        // add list of items to the collection
        add : function(list){
            // dont allow adding nothing
            if (!arguments.length) {
                return this;
            }

            // make sure list is as an array
            list = _.isArray(list) ? list : [list];
            this.collection = this.collection.concat(list);

            this.length = this.collection.length;

            return this;
        },

        // return the item at index
        at: function(index){
            return this.collection[index];
        }
    });


    // Stuff we took out of bootstrap that can augment the collection
    // **************************************************************
    var methods = ['where','filter'];
    var slice = Array.prototype.slice;

    // Mix in each Underscore method as a proxy to `Collection#models`.
    _.each(methods, function(method) {
        Collection.prototype[method] = function() {
            var args = slice.call(arguments);
            args.unshift(this.collection);
            var coll = _[method].apply(_,args);
            return new Collection(coll);
        };
    });

    return Collection;
}

// @TODO: repeat currently repeats only the last element, we need repeat = 'set' or something in order to prevent re-randomizing of exRandom...

RandomizerProvider.$inject = ['randomizeInt', 'randomizeRange', 'Collection'];
function RandomizerProvider(randomizeInt, randomizeRange, Collection){

    function Randomizer(){
        this._cache = {
            random : {},
            exRandom : {},
            sequential : {}
        };
    }

    _.extend(Randomizer.prototype, {
        random: random,
        exRandom: exRandom,
        sequential: sequential
    });

    return Randomizer;

    function random(length, seed, repeat){
        var cache  = this._cache.random;

        if (repeat && !_.isUndefined(cache[seed])) {
            return cache[seed];
        }

        // save result in cache
        cache[seed] = randomizeInt(length);

        return cache[seed];
    }

    function sequential(length, seed, repeat){
        var cache = this._cache.sequential;
        var coll = cache[seed];
        var result;

        // if needed create collection and set it in seed
        if (_.isUndefined(coll)){
            coll = cache[seed] = new Collection(_.range(length));
            return coll.first();
        }

        if (coll.length !== length){
            throw new Error('This seed  ('+ seed +') points to a collection with the wrong length, you can only use a seed for sets of the same length');
        }

        // if this is a repeated element:
        if (repeat) {
            return coll.current();
        }

        // if we've reached the end
        result = coll.next();

        // if we've reached the end of the collection (next)
        if (_.isUndefined(result)){
            return coll.first();
        } else {
            return result;
        }
    }

    function exRandom(length, seed, repeat){
        var cache = this._cache.exRandom;
        var coll = cache[seed];
        var result;

        // if needed create collection and set it in seed
        if (_.isUndefined(coll)){
            coll = cache[seed] = new Collection(randomizeRange(length));
            return coll.first();
        }

        if (coll.length !== length){
            throw new Error('This seed  ('+ seed +') points to a collection with the wrong length, you can only use a seed for sets of the same length');
        }

        // if this is a repeated element:
        if (repeat) {
            return coll.current();
        }

        // if we've reached the end
        result = coll.next();

        // if we've reached the end of the collection (next)
        // we should re-randomize
        if (_.isUndefined(result)){
            coll = cache[seed] = new Collection(randomizeRange(length));
            return coll.first();
        } else {
            return result;
        }
    }

}

/*
 *	The store is a collection of collection devided into namespaces.
 *	You can think of every namespace/collection as a table.
 */
storeProvider$1.$inject = ['Collection'];
function storeProvider$1(Collection){

    function Store(){
        this.store = {};
    }

    _.extend(Store.prototype, {
        create: function create(nameSpace){
            if (this.store[nameSpace]){
                throw new Error('The name space ' + nameSpace + ' already exists');
            }
            this.store[nameSpace] = new Collection();
            this.store[nameSpace].namespace = nameSpace;
        },

        read: function read(nameSpace){
            if (!this.store[nameSpace]){
                throw new Error('The name space ' + nameSpace + ' does not exist');
            }
            return this.store[nameSpace];
        },

        update: function update(nameSpace, data){
            var coll = this.read(nameSpace);
            coll.add(data);
        },

        del: function del(nameSpace){
            this.store[nameSpace] = undefined;
        }
    });

    return Store;
}

SequenceProvider.$inject = ['MixerSequence'];
function SequenceProvider(MixerSequence){

    /**
     * Sequence Constructor:
     * Manage the progression of a sequence, including parsing (mixing, inheritance and templating).
     * @param  {String  } namespace [pages or questions (the type of db.Store)]
     * @param  {Array   } arr       [a sequence to manage]
     * @param  {Database} db        [the db itself]
     */

    function Sequence(namespace, arr,db){
        this.namespace = namespace;
        this.mixerSequence = new MixerSequence(arr);
        this.db = db;
    }

    _.extend(Sequence.prototype, {
        // only mix
        next: function(context){
            this.mixerSequence.next(context);
            return this;
        },

        // anti mix
        prev: function(context){
            this.mixerSequence.prev(context);
            return this;
        },

        /**
         * Return the element currently in focus.
         * It always returns either an element or undefined (mixers are abstrcted away)
         * @param  {[type]} context [description]
         * @return {[type]}         [description]
         */
        current: function(context, options){
            context || (context = {});
            // must returned an element or undefined
            var obj = this.mixerSequence.current(context);

            // in case this is the end of the sequence
            if (!obj){
                return obj;
            }

            return this.db.inflate(this.namespace, obj, context, options);
        },

        /**
         * Returns an array of elements, created by proceeding through the whole sequence.
         * @return {[type]} [description]
         */
        all: function(context, options){
            var sequence = [];

            var el = this.next().current(context, options);
            while (el){
                sequence.push(el);
                el = this.next().current(context, options);
            }

            return sequence;
        }
    });

    return Sequence;
}

DatabaseProvider.$inject = ['DatabaseStore', 'DatabaseRandomizer', 'databaseInflate', 'templateObj', 'databaseSequence','piConsole'];
function DatabaseProvider(Store, Randomizer, inflate, templateObj, DatabaseSequence, piConsole){

    function Database(){
        this.store = new Store();
        this.randomizer = new Randomizer();
    }

    _.extend(Database.prototype, {
        createColl: function(namespace){
            this.store.create(namespace);
        },

        getColl: function(namespace){
            return this.store.read(namespace);
        },

        add: function(namespace, query){
            var coll = this.store.read(namespace);
            coll.add(query);
        },

        inflate: function(namespace, query, context, options){
            var coll = this.getColl(namespace);
            var result;

            // inherit
            try {
                if (!query.$inflated || query.reinflate) {
                    query.$inflated = inflate(query, coll, this.randomizer);
                    query.$templated = null; // we have to retemplate after querying, who know what new templates we got here...
                }
            } catch(err) {
                piConsole({
                    type:'error',
                    message: 'Failed to inherit',
                    error:err,
                    context: query
                });
                if (this.onError) this.onError(err);
                throw err;
            }

            // template
            try {
                if (!query.$templated || query.$inflated.regenerateTemplate){
                    context[namespace + 'Meta'] = query.$meta;
                    context[namespace + 'Data'] = templateObj(query.$inflated.data || {}, context, options); // make sure we support
                    query.$templated = templateObj(query.$inflated, context, options);
                }
            } catch(err) {
                piConsole({
                    type:'error',
                    message: 'Failed to apply template',
                    error:err,
                    context: query.$inflated
                });
                if (this.onError) this.onError(err);
                throw err;
            }

            result = query.$templated;

            // set flags
            if (context.global && result.addGlobal) _.extend(context.global, result.addGlobal);

            if (context.current && result.addCurrent) _.extend(context.current, result.addCurrent);

            return result;
        },

        sequence: function(namespace, arr){
            if (!_.isArray(arr)){
                throw new Error('Sequence must be an array.');
            }
            return new DatabaseSequence(namespace, arr, this);
        }
    });

    return Database;
}

queryProvider$1.$inject = ['Collection'];
function queryProvider$1(Collection){

    function queryFn(query, collection, randomizer){
        var coll = new Collection(collection);

        // shortcuts:
        // ****************************

        if (_.isFunction(query)) return query(collection);

        if (_.isString(query) || _.isNumber(query)) query = {set:query, type:'random'};

        // filter by set
        // ****************************
        if (query.set) coll = coll.where({set:query.set});

        // filter by data
        // ****************************
        if (_.isString(query.data)){
            coll = coll.filter(function(q){
                return q.handle === query.data || (q.data && q.data.handle === query.data);
            });
        }

        if (_.isPlainObject(query.data)) coll = coll.where({data:query.data});

        if (_.isFunction(query.data)) coll = coll.filter(query.data);

        // pick by type
        // ****************************

        // the default seed is namespace specific just to minimize the situations where seeds clash across namespaces
        var seed = query.seed || ('$' + collection.namespace + query.set);
        var length = coll.length;
        var repeat = query.repeat;
        var at;

        switch (query.type){
            case undefined:
            case 'byData':
            case 'random':
                at = randomizer.random(length,seed,repeat);
                break;
            case 'exRandom':
                at = randomizer.exRandom(length,seed,repeat);
                break;
            case 'sequential':
                at = randomizer.sequential(length,seed,repeat);
                break;
            case 'first':
                at = 0;
                break;
            case 'last':
                at = length-1;
                break;
            default:
                throw new Error('Unknow query type: ' + query.type);
        }

        if (_.isUndefined(coll.at(at))) throw new Error('Query failed, object (' + JSON.stringify(query) +	') not found. If you are trying to apply a template, you should know that they are not supported for inheritance.');

        return coll.at(at);
    }

    return queryFn;
}

/*
 * inflates an object
 * this function is responsible for inheritance
 *
 * function inflate(source,coll, randomizer, recursive, counter)
 * @param source: the object to inflate
 * @param coll: a collection to inherit from
 * @param randomizer: a randomizer object for the query
 * @param recursive: private use only, is this inside the recursion (true) or top level (false)
 * @param depth: private use only, a counter for the depth of the recursion
 */
inflateProvider$1.$inject = ['databaseQuery','$rootScope'];
function inflateProvider$1(query, $rootScope){

    function customize(source){
        // check for a custom function and run it if it exists
        if (_.isFunction(source.customize)){
            source.customize.apply(source, [source, $rootScope.global]);
        }
        return source;
    }

    // @param source - object to inflate
    // @param type - trial stimulus or media
    // @param recursive - whether this is a recursive call or not
    function inflate(source, coll, randomizer, recursive, depth){

        // protection against infinte loops
        // ***********************************
        depth = recursive ? --depth : 10;

        if (!depth) throw new Error('Inheritance loop too deep, you can only inherit up to 10 levels down');

        if (!_.isPlainObject(source)) throw new Error('You are trying to inflate a non object (' + JSON.stringify(source) + ')');

        var parent;
        var child = _.cloneDeep(source);
        var inheritObj = child.inherit;

        /*
         * no inheritance
         */

        if (!child.inherit) {
            if (!recursive) customize(child); // customize only on the last call (non recursive)
            return child;
        }

        /*
         * get parent
         */
        parent = query(inheritObj, coll, randomizer);

        // if inherit target was not found
        if (!parent) throw new Error('Query failed, object (' + JSON.stringify(inheritObj) +	') not found.');

        // inflate parent (recursively)
        parent = inflate(
            parent,
            coll,
            randomizer,
            true,
            depth
        );

        // extending the child
        // ***********************************
        if (inheritObj.merge && !_.isArray(inheritObj.merge)){
            throw new Error('Inheritance error: inherit.merge must be an array.');
        }

        // start inflating child (we have to extend selectively...)
        _.each(parent, function(value, key){
            var childProp, parentProp;
            // if this key is not set yet, copy it out of the parent
            if (!(key in child)){
                child[key] = _.isFunction(value) ? value : _.cloneDeep(value);
                return;
            }

            // if we have a merge array,
            if (_.indexOf(inheritObj.merge, key) != -1){
                childProp = child[key];
                parentProp = value;

                if (_.isArray(childProp)){
                    if (!_.isArray(parentProp)){
                        throw new Error('Inheritance error: You tried merging an array with an non array (for "' + key + '")');
                    }
                    child[key] = childProp.concat(parentProp);
                }

                if (_.isPlainObject(childProp)){
                    if (!_.isPlainObject(parentProp)){
                        throw new Error('Inheritance error: You tried merging an object with an non object (for "' + key + '")');
                    }
                    child[key] = _.extend({},parentProp,childProp);
                }

            }
        });

        // we want to extend the childs data even if it already exists
        // its ok to shallow extend here (because by definition parent was created for this inflation)
        if (parent.data){
            child.data = _.extend(parent.data, child.data || {});
        }

        // Personal customization functions - only if this is the last iteration of inflate
        // This way the customize function gets called only once.
        !recursive && customize(child);

        // return inflated trial
        return child;
    }

    return inflate;
}

var global = window.piGlobal;

var piConsole = piConsoleFactory$1(console);
var collection = collectionService();

var DatabaseRandomizer = RandomizerProvider(
    randomInt,// randomize int
    randomArr,// randomize range
    collection
);

var databaseQuery = queryProvider$1(
    collection,
    piConsole
);

var databaseInflate = inflateProvider$1(
    databaseQuery,
    {global: global}, // rootscope
    piConsole
);

var DatabaseStore = storeProvider$1(
    collection
);

var databaseSequence = SequenceProvider(
    MixerSequence
);

var Database = DatabaseProvider(
    DatabaseStore,
    DatabaseRandomizer,
    databaseInflate,
    templateObj,
    databaseSequence,
    piConsole
);

function randomArr(length){
    return _.shuffle(_.range(length));
}

function randomInt(length){
    return Math.floor(Math.random()*length);
}

return Database;

})));
//# sourceMappingURL=minno-sequencer.js.map
