define(['managerAPI'], function(Manager) {
    var API = new Manager();

    API.setName('mgr');
    API.addSettings('skip',true);
    API.addSettings('skin','demo');

    var mediaURL = './study/media/';  // where the images are stored on the server
    var timeURL  = '//cdn.jsdelivr.net/gh/minnojs/minno-time@0.3/dist/js';

    API.addGlobal({
        // pd_biat: {},    // this and the next to save results from IATs
        id_iat: {},
        pd_iat: {},

        mediaURL:  mediaURL,
        idLabel:      'Intellectually disabled',
        pdLabel:      'Physically disabled',
        ableLabel:    'Abled persons',
        disableLabel: 'Disbled persons',

        posWords:  API.shuffle([
            'Lovely',
            'Fabulous',
            'Attractive',
            'Friend',
            'Fantastic',
            'Friendship',
            'Cherish',
            'Magnificent',
        ]),
        negWords: API.shuffle([
            'Horrible',
            'Hate',
            'Poison',
            'Yucky',
            'Bothersome',
            'Angry',
            'Abuse',
            'Disaster',
        ]),
        disabledImages: API.shuffle([
           mediaURL + 'disabled1.png',
           mediaURL + 'disabled2.png',
           mediaURL + 'disabled3.png',
           mediaURL + 'disabled4.png',
        ]),
        abledImages: API.shuffle([
           mediaURL + 'abled1.png',
           mediaURL + 'abled2.png',
           mediaURL + 'abled3.png',
           mediaURL + 'abled4.png',
        ]),
        intellectually_disabled_words : API.shuffle([
          'Dependent',
          'Mental handicap',
          'Slow learner',
          'Impaired',
          'Special needs',
        ]),
    });

    // List of segments of process. Actual ordering and calls are below in `addSequence()`
    API.addTasksSet({
        name: 'myTasks',

        instructions: [{
            type:       'message',
            buttonText: 'Continue',
        }],

        realstart: [{
            type:       'quest',
            // inherit:    'instructions',
            name:       'participation',
            scriptUrl:  'participation.js?' + Math.random(),
            title:      'Participation',
            piTemplate:  true,
            header:     'Welcome',
        }],

        disclaimer: [{
            inherit:     'instructions',
            name:        'disclaimer',
            templateUrl: 'disclaimer.jst?' + Math.random(),
            title:       'CMU/CME disclaimer',
            piTemplate:   true,
            header:      'CMU/CME disclaimer',
        }],

        id_iat_instructions: [{
            inherit:     'instructions',
            name:        'id_iat_instructions',
            templateUrl: 'id_iat_instructions.jst?' + Math.random(),
            title:       'The Implicit Association Test',
            header:      'The Implicit Association Test',
        }],

        id_iat: [{
            baseUrl:   timeURL,
            name:      'id_iat',
            scriptUrl: 'id_iat.js?' + Math.random(),
            type:      'pip',
            version:   0.3,
        }],

        // pd_biat: [{
        //     baseUrl:   timeURL,
        //     name:      'pd_biat',
        //     scriptUrl: 'pd_biat.js?' + Math.random(),
        //     type:      'pip',
        //     version:   0.3,
        // }],

        pd_iat_instructions: [{
            inherit:     'instructions',
            name:        'pd_iat_instructions',
            templateUrl: 'pd_iat_instructions.jst?' + Math.random(),
            title:       'The Implicit Association Test',
            piTemplate:  true,
            header:      'The Implicit Association Test',
        }],

        pd_iat: [{
            baseUrl:   timeURL,
            name:      'pd_iat',
            scriptUrl: 'pd_iat.js?' + Math.random(),
            type:      'pip',
            version:   0.3,
        }],

        raceiat: [{
            baseUrl: timeURL,
            name: 'raceiat',
            scriptUrl: 'raceiat.js?' + Math.random(),
            type: 'pip',
            version: 0.3,
        }],

        raceiat_instructions: [{
            inherit: 'instructions',
            name: 'raceiat_instructions',
            templateUrl: 'raceiat_instructions.jst?' + Math.random(),
            title: 'IAT Instructions',
            piTemplate: true,
            header: 'Implicit Association Test',
        }],

        counseling_introduction: [{
            inherit:     'instructions',
            name:        'counseling_introduction',
            templateUrl: 'counseling_introduction.jst?' + Math.random(),
            title:       'Counseling Introduction',
            piTemplate:   true,
            header:      'Counseling Introduction',
        }],

        counseling_what_is_it: [{
            inherit:     'instructions',
            name:        'counseling_what_is_it',
            templateUrl: 'counseling_what_is_it.jst?' + Math.random(),
            title:       'What is Pateient-Centered Counseling?',
            piTemplate:   true,
            header:      'What is Patient-Centered Counseling?',
        }],

        counseling_challenges: [{
            inherit:     'instructions',
            name:        'counseling_challenges',
            templateUrl: 'counseling_challenges.jst?' + Math.random(),
            title:       'Patient-Centered Counseling Challenges',
            piTemplate:   true,
            header:      'Patient-Centered Counseling Challenges',
        }],

        counseling_refs: [{
            inherit:     'instructions',
            name:        'counseling_refs',
            templateUrl: 'counseling_refs.jst?' + Math.random(),
            title:       'Patient-Centered Counseling Challenges',
            piTemplate:   true,
            header:      'Patient-Centered Counseling Challenges',
        }],

        debriefing: [{
            type: 'quest',
            name: 'debriefing',
            scriptUrl: 'debriefing.js?' + Math.random(),
        }],

        demographics: [{
            type:       'quest',
            // inherit:    'clinical_scenario_1',
            name:       'demographics',
            scriptUrl:  'demographics.js?' + Math.random(),
            title:      'Demographic Questions',
            piTemplate:  true,
            header:     'Demographic Questions',
        }],

        clinical_scenario_1: [{
            inherit:     'instructions',
            name:        'clinical_scenario_1',
            templateUrl: 'clinical_scenario_1.jst?' + Math.random(),
            title:       'Scenario One',
            piTemplate:   true,
            header:      'Scenario One',
        }],

        clinical_scenario_1_questions: [{
            type:       'quest',
            // inherit:    'clinical_scenario_1',
            name:       'clinical_scenario_1_questions',
            scriptUrl:  'clinical_scenario_1_questions.js?' + Math.random(),
            title:      'Scenario One Questions',
            piTemplate:  true,
            header:     'Scenario One Questions',
        }],

        clinical_scenario_2: [{
            inherit:     'instructions',
            name:        'clinical_scenario_2',
            templateUrl: 'clinical_scenario_2.jst?' + Math.random(),
            title:       'Scenario Two',
            piTemplate:   true,
            header:      'Scenario Two',
        }],

        clinical_scenario_2_questions: [{
            type:       'quest',
            // inherit:    'instructions',
            name:       'clinical_scenario_2_questions',
            scriptUrl:  'clinical_scenario_2_questions.js?' + Math.random(),
            title:      'Scenario Two Questions',
            piTemplate:  true,
            header:     'Scenario Two Questions',
        }],

        clinical_scenario_3: [{
            inherit:     'instructions',
            name:        'clinical_scenario_3',
            templateUrl: 'clinical_scenario_3.jst?' + Math.random(),
            title:       'Scenario Three',
            piTemplate:   true,
            header:      'Scenario Three',
        }],

        clinical_scenario_3_questions: [{
            type:       'quest',
            // inherit:    'instructions',
            name:       'clinical_scenario_3_questions',
            scriptUrl:  'clinical_scenario_3_questions.js?' + Math.random(),
            title:      'Scenario Three Questions',
            piTemplate:  true,
            header:     'Scenario Three Questions',
        }],

        clinical_scenario_4: [{
            inherit:     'instructions',
            name:        'clinical_scenario_4',
            templateUrl: 'clinical_scenario_4.jst?' + Math.random(),
            title:       'Scenario Four',
            piTemplate:   true,
            header:      'Scenario Four',
        }],

        clinical_scenario_4_questions: [{
            type:       'quest',
            // inherit:    'instructions',
            name:       'clinical_scenario_4_questions',
            scriptUrl:  'clinical_scenario_4_questions.js?' + Math.random(),
            title:      'Scenario Four Questions',
            piTemplate:  true,
            header:     'Scenario Four Questions',
        }],

        case_1_1: [{
            inherit:     'instructions', // For some reason I have to do this to get past the questions.
            name:        'case_1_1',
            templateUrl: 'case_1_1.jst?' + Math.random(),
            title:       'First Case',
            piTemplate:   true,
            header:      'First Case',
        }],

        case_1_2: [{
            inherit:     'case_1_1', // For some reason I have to do this to get past the questions.
            name:        'case_1_2',
            templateUrl: 'case_1_2.jst?' + Math.random(),
            title:       'First Case',
            piTemplate:   true,
            header:      'First Case',
        }],

        case_1_3: [{
            inherit:     'case_1_2', // For some reason I have to do this to get past the questions.
            name:        'case_1_3',
            templateUrl: 'case_1_3.jst?' + Math.random(),
            title:       'First Case',
            piTemplate:   true,
            header:      'First Case',
        }],

        case_1_summary: [{
            inherit:     'case_1_3', // For some reason I have to do this to get past the questions.
            name:        'case_1_summary',
            templateUrl: 'case_1_summary.jst?' + Math.random(),
            title:       'First Case',
            piTemplate:   true,
            header:      'First Case',
        }],

        case_2_1: [{
            inherit:     'instructions',
            name:        'case_2_1',
            templateUrl: 'case_2_1.jst?' + Math.random(),
            title:       'Second Case',
            piTemplate:   true,
            header:      'Second Case',
        }],

        case_2_2: [{
            inherit:     'instructions', // For some reason I have to do this to get past the questions.
            name:        'case_2_2',
            templateUrl: 'case_2_2.jst?' + Math.random(),
            title:       'First Case',
            piTemplate:   true,
            header:      'First Case',
        }],

        case_2_3: [{
            inherit:     'instructions', // For some reason I have to do this to get past the questions.
            name:        'case_2_3',
            templateUrl: 'case_2_3.jst?' + Math.random(),
            title:       'First Case',
            piTemplate:   true,
            header:      'First Case',
        }],

        case_2_summary: [{
            inherit:     'instructions', // For some reason I have to do this to get past the questions.
            name:        'case_2_summary',
            templateUrl: 'case_2_summary.jst?' + Math.random(),
            title:       'First Case',
            piTemplate:   true,
            header:      'First Case',
        }],

        case_3_1: [{
            inherit:     'case_2_summary',
            name:        'case_3_1',
            templateUrl: 'case_3_1.jst?' + Math.random(),
            title:       'Second Case',
            piTemplate:   true,
            header:      'Second Case',
        }],

        case_3_2: [{
            inherit:     'case_3_1', // For some reason I have to do this to get past the questions.
            name:        'case_3_2',
            templateUrl: 'case_3_2.jst?' + Math.random(),
            title:       'First Case',
            piTemplate:   true,
            header:      'First Case',
        }],

        case_3_3: [{
            inherit:     'case_3_2', // For some reason I have to do this to get past the questions.
            name:        'case_3_3',
            templateUrl: 'case_3_3.jst?' + Math.random(),
            title:       'First Case',
            piTemplate:   true,
            header:      'First Case',
        }],

        case_3_summary: [{
            inherit:     'case_3_3', // For some reason I have to do this to get past the questions.
            name:        'case_3_summary',
            templateUrl: 'case_3_summary.jst?' + Math.random(),
            title:       'First Case',
            piTemplate:   true,
            header:      'First Case',
        }],

        case_3: [{
            inherit:     'case_2',
            name:        'case_3',
            templateUrl: 'case_3.jst?' + Math.random(),
            title:       'Third Case',
            piTemplate:   true,
            header:      'Third Case',
        }],

        case_4: [{
            inherit:     'case_3',
            name:        'case_4',
            templateUrl: 'case_4.jst?' + Math.random(),
            title:       'Fourth Case',
            piTemplate:   true,
            header:      'Fourth Case',
        }],

        lastpage: [{
            type: 'message',
            name: 'lastpage',
            templateUrl: 'lastpage.jst?' + Math.random(),
            title: 'End',
            piTemplate: true,
            buttonHide: true,
            last:true,
            header: 'You have completed the study'
        }],

        end: [{
            type:        'message',
            name:        'end',
            templateUrl: 'end.jst?' + Math.random(),
            title:       'End',
            piTemplate:  true,
            buttonHide:  true,
            last:        true,
            header:      'You have completed the study'
        }],

        thanks: [{
            type:        'message',
            name:        'thanks',
            templateUrl: 'thanks.jst?' + Math.random(),
            title:       'Thank You',
            piTemplate:  true,
            buttonHide:  true,
            last:        true,
            header:      'You have completed the study'
        }],
    });


    API.addSequence([
        // Each set of curly braces is a page.
        {inherit: 'realstart'},
        { // If they decline to participate send them to thanks anyway.
          mixer: 'branch',
          conditions: [
            {compare: "I agree to participate", to: 'questions.participate.response'} // figuring out that the question was in the quesiton object and that there wasn't a participation object. Also, you can't have a . in the comparison or it won't parse correctly. I didn't try with a variable, maybe that'd fix it.
          ],
          data: [
            {  // now, continuring ed credit?
              mixer: 'branch',
              conditions: [
                {compare: "Yes", to: 'questions.cmeCeu.response'}
              ],
              data: [
                {inherit: 'disclaimer'}
              ],
            }, // end continuing ed credit
            // First clinical_scenario_, which is used to track improvement after patient-centered
              // teaching module
            {inherit: 'clinical_scenario_1'},
            {inherit: 'clinical_scenario_1_questions'},
            {inherit: 'clinical_scenario_2'},
            {inherit: 'clinical_scenario_2_questions'},

            // Demographics
            // {inherit: 'demographics'},

            // First IAT, for physical disabilities
            {inherit: 'pd_iat_instructions'},
            {inherit: 'pd_iat'},

            // // // Second IAT, for intellectual disabilities
            // {inherit: 'id_iat_instructions'},
            // {inherit: 'id_iat'},

            // Explaining patient-centered counseling
            // {inherit: 'counseling_introduction'},
            // {inherit: 'counseling_what_is_it'},
            // {inherit: 'counseling_challenges'},
            // {inherit: 'counseling_refs'},

            // // Patient-centered counseling scenarios for teaching
            // {inherit: 'case_1_1'},
            // {inherit: 'case_1_2'},
            // {inherit: 'case_1_3'},
            // {inherit: 'case_1_summary'},

            // {inherit: 'case_2_1'},
            // {inherit: 'case_2_2'},
            // {inherit: 'case_2_3'},
            // {inherit: 'case_2_summary'},

            // {inherit: 'case_3_1'},
            // {inherit: 'case_3_2'},
            // {inherit: 'case_3_3'},
            // {inherit: 'case_3_summary'},

            // // Patient-centered counseling scenarios for post–teaching module follow-up testing
            // {inherit: 'clinical_scenario_3'},
            // {inherit: 'clinical_scenario_3_questions'},
            // {inherit: 'clinical_scenario_4'},
            // {inherit: 'clinical_scenario_4_questions'},

            // {inherit: 'debriefing'},
            // Write out answers
            {
                type: 'postCsv',
                url:  'csv.php',
            },
            {inherit: 'lastpage'},
            {inherit: 'end'},
          ],
          elseData:[{inherit: 'thanks'}], // optional
        }
    ]); // end add sequence
    return API.script;
});
