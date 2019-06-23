// This is brief IAT. Uncomment first line and comment second line to do full IAT.

// define(['pipAPI','https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.1.0/IAT/iat6.js'], function(APIConstructor, iatExtension){
define(['pipAPI','https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.1/IAT/biat6.js'], function(APIConstructor, iatExtension){
    var API    = new APIConstructor();
    var global = API.getGlobal();

    return iatExtension({
        category1 : {
            name : global.pdLabels, //Will appear in the data.
            title : {
                media : {word : global.pdLabels}, //Name of the category presented in the task.
                css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
                height : 4 //Used to position the "Or" in the combined block.
            },
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {image: 'abled1.jpg'},
                {image: 'abled2.jpg'},
                {image: 'abled3.jpg'},
                {image: 'abled4.jpg'},
            ],
            //Stimulus css (style)
            stimulusCss : {color:'#31940F','font-size':'2.3em'}
        },
        category2 : {
            name : global.pdLabels, //Will appear in the data.
            title : {
                media : {word : global.pdLabels}, //Name of the category presented in the task.
                css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
                height : 4 //Used to position the "Or" in the combined block.
            },
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {image: 'disabled1.jpg'},
                {image: 'disabled2.jpg'},
                {image: 'disabled3.jpg'},
                {image: 'disabled4.jpg'},
            ],
            //Stimulus css (style)
            stimulusCss : {
                           color:      '#31940F',
                          'font-size': '2.3em'
                          }
        },
        attribute1 : {
            name : 'Bad',
            title : {
                media: {word: 'Bad'},
                css:   {
                         color:
                         '#0000FF',
                         'font-size': '1.8em'
                        },
                height: 4 //Used to position the "Or" in the combined block.
            },
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {word: global.negWords[0]},
                {word: global.negWords[1]},
                {word: global.negWords[2]},
                {word: global.negWords[3]},
                {word: global.negWords[4]},
                {word: global.negWords[5]},
                {word: global.negWords[6]},
                {word: global.negWords[7]}
            ],
            //Stimulus css
            stimulusCss : {color:'#0000FF','font-size':'2.3em'}
        },
        attribute2 : {
            name : 'Good',
            title : {
                media : {word : 'Good'},
                css :   {color:'#0000FF','font-size':'1.8em'},
                height : 4 //Used to position the "Or" in the combined block.
            },
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {word: global.posWords[0]},
                {word: global.posWords[1]},
                {word: global.posWords[2]},
                {word: global.posWords[3]},
                {word: global.posWords[4]},
                {word: global.posWords[5]},
                {word: global.posWords[6]},
                {word: global.posWords[7]}
            ],
            //Stimulus css
            stimulusCss : {color:'#0000FF','font-size':'2.3em'}
        },
        base_url : { // Where are your images?
            image : global.baseURL
        },
        isTouch : global.isTouch
    });
});

