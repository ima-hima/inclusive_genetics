define(['managerAPI'], function(Manager) {
    var API = new Manager();

    API.setName('mgr');

    API.addSettings('skip', true);

    API.addSettings('skin', 'simple');

    var mediaURL = './study/media/';  // where the images are stored on the server
    var timeURL  = '//cdn.jsdelivr.net/gh/minnojs/minno-time@0.3/dist/js';

    API.addGlobal({
        id_iat: {},
        pd_iat: {},

        mediaURL:     mediaURL,
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

        question: [{
          type:       'quest',
          piTemplate: true,
        }],

        iat: [{
          baseUrl:   timeURL,
          type:      'pip',
          version:   0.3,
        }],

        results: [{
           type:        'message',
           piTemplate:  true,
           buttonHide:  true,
           last:        true,
        }],

        participation: [{
            inherit:    'question',
            name:       'participation',
            scriptUrl:  'participation.js?' + Math.random(),
            title:      'Project Inclusive Genetics',
            header:     'Welcome',
        }],

        ce_disclaimer: [{
            inherit:     'instructions',
            name:        'ce_disclaimer',
            templateUrl: 'ce_disclaimer.jst?' + Math.random(),
            title:       'Continuing Education disclaimer',
            header:      'Continuing Education disclaimer',
        }],

        id_iat_instructions: [{
            inherit:     'instructions',
            name:        'id_iat_instructions',
            templateUrl: 'id_iat_instructions.jst?' + Math.random(),
            title:       'The Implicit Association Test',
            header:      'The Implicit Association Test',
        }],

        id_iat: [{
            inherit:   'iat',
            name:      'id_iat',
            scriptUrl: 'id_iat.js?' + Math.random(),
        }],

        pd_iat_instructions: [{
            inherit:     'instructions',
            name:        'pd_iat_instructions',
            templateUrl: 'pd_iat_instructions.jst?' + Math.random(),
            title:       'The Implicit Association Test',
            piTemplate:  true,
            header:      'The Implicit Association Test',
        }],

        pd_iat: [{
            inherit:   'iat',
            name:      'pd_iat',
            scriptUrl: 'pd_iat.js?' + Math.random(),
        }],

        counseling_introduction: [{
            inherit:     'instructions',
            name:        'counseling_introduction',
            templateUrl: 'counseling_introduction.jst?' + Math.random(),
            title:       'Counseling Introduction',
            header:      'Counseling Introduction',
        }],

        counseling_what_is_it: [{
            inherit:     'instructions',
            name:        'counseling_what_is_it',
            templateUrl: 'counseling_what_is_it.jst?' + Math.random(),
            title:       'What is Pateient-Centered Counseling?',
            header:      'What is Patient-Centered Counseling?',
        }],

        counseling_challenges: [{
            inherit:     'instructions',
            name:        'counseling_challenges',
            templateUrl: 'counseling_challenges.jst?' + Math.random(),
            title:       'Patient-Centered Counseling Challenges',
            header:      'Patient-Centered Counseling Challenges',
        }],

        counseling_refs: [{
            inherit:     'instructions',
            name:        'counseling_refs',
            templateUrl: 'counseling_refs.jst?' + Math.random(),
            title:       'Patient-Centered Counseling Challenges',
            header:      'Patient-Centered Counseling Challenges',
        }],

        demographics: [{
            inherit:    'question',
            name:       'demographics',
            scriptUrl:  'demographics.js?' + Math.random(),
            title:      'Demographic Questions',
            header:     'Demographic Questions',
        }],

        clinical_scenario_1: [{
            inherit:     'instructions',
            name:        'clinical_scenario_1',
            templateUrl: 'clinical_scenario_1.jst?' + Math.random(),
            title:       'Scenario One',
            header:      'Scenario One',
        }],

        clinical_scenario_1_questions: [{
            inherit:    'question',
            name:       'clinical_scenario_1_questions',
            scriptUrl:  'clinical_scenario_1_questions.js?' + Math.random(),
            title:      'Scenario One Questions',
            header:     'Scenario One Questions',
        }],

        clinical_scenario_2: [{
            inherit:     'instructions',
            name:        'clinical_scenario_2',
            templateUrl: 'clinical_scenario_2.jst?' + Math.random(),
            title:       'Scenario Two',
            header:      'Scenario Two',
        }],

        clinical_scenario_2_questions: [{
            inherit:    'question',
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
            header:      'Scenario Three',
        }],

        clinical_scenario_3_questions: [{
            inherit:    'question',
            name:       'clinical_scenario_3_questions',
            scriptUrl:  'clinical_scenario_3_questions.js?' + Math.random(),
            title:      'Scenario Three Questions',
            header:     'Scenario Three Questions',
        }],

        clinical_scenario_4: [{
            inherit:     'instructions',
            name:        'clinical_scenario_4',
            templateUrl: 'clinical_scenario_4.jst?' + Math.random(),
            title:       'Scenario Four',
            header:      'Scenario Four',
        }],

        clinical_scenario_4_questions: [{
            inherit:    'question',
            name:       'clinical_scenario_4_questions',
            scriptUrl:  'clinical_scenario_4_questions.js?' + Math.random(),
            title:      'Scenario Four Questions',
            header:     'Scenario Four Questions',
        }],

        console_check: [{
            inherit:    'question',
            name:       'console_check',
            scriptUrl:  'console_check.js?' + Math.random(),
            title:      'Scenario Four Questions',
            header:     'Scenario Four Questions',
        }],

        case_1_1: [{
            inherit:     'instructions', // For some reason I have to do this to get past the questions.
            name:        'case_1_1',
            templateUrl: 'case_1_1.jst?' + Math.random(),
            title:       'First Case',
            header:      'First Case',
        }],

        case_1_2: [{
            inherit:     'case_1_1', // For some reason I have to do this to get past the questions.
            name:        'case_1_2',
            templateUrl: 'case_1_2.jst?' + Math.random(),
            title:       'First Case',
            header:      'First Case',
        }],

        case_1_3: [{
            inherit:     'case_1_2', // For some reason I have to do this to get past the questions.
            name:        'case_1_3',
            templateUrl: 'case_1_3.jst?' + Math.random(),
            title:       'First Case',
            header:      'First Case',
        }],

        case_1_summary: [{
            inherit:     'case_1_3', // For some reason I have to do this to get past the questions.
            name:        'case_1_summary',
            templateUrl: 'case_1_summary.jst?' + Math.random(),
            title:       'First Case',
            header:      'First Case',
        }],

        case_2_1: [{
            inherit:     'instructions',
            name:        'case_2_1',
            templateUrl: 'case_2_1.jst?' + Math.random(),
            title:       'Second Case',
            header:      'Second Case',
        }],

        case_2_2: [{
            inherit:     'instructions', // For some reason I have to do this to get past the questions.
            name:        'case_2_2',
            templateUrl: 'case_2_2.jst?' + Math.random(),
            title:       'First Case',
            header:      'First Case',
        }],

        case_2_3: [{
            inherit:     'instructions', // For some reason I have to do this to get past the questions.
            name:        'case_2_3',
            templateUrl: 'case_2_3.jst?' + Math.random(),
            title:       'First Case',
            header:      'First Case',
        }],

        case_2_summary: [{
            inherit:     'instructions', // For some reason I have to do this to get past the questions.
            name:        'case_2_summary',
            templateUrl: 'case_2_summary.jst?' + Math.random(),
            title:       'First Case',
            header:      'First Case',
        }],

        case_3_1: [{
            inherit:     'case_2_summary',
            name:        'case_3_1',
            templateUrl: 'case_3_1.jst?' + Math.random(),
            title:       'Second Case',
            header:      'Second Case',
        }],

        case_3_2: [{
            inherit:     'case_3_1', // For some reason I have to do this to get past the questions.
            name:        'case_3_2',
            templateUrl: 'case_3_2.jst?' + Math.random(),
            title:       'First Case',
            header:      'First Case',
        }],

        case_3_3: [{
            inherit:     'case_3_2', // For some reason I have to do this to get past the questions.
            name:        'case_3_3',
            templateUrl: 'case_3_3.jst?' + Math.random(),
            title:       'First Case',
            header:      'First Case',
        }],

        case_3_summary: [{
            inherit:     'case_3_3', // For some reason I have to do this to get past the questions.
            name:        'case_3_summary',
            templateUrl: 'case_3_summary.jst?' + Math.random(),
            title:       'First Case',
            header:      'First Case',
        }],

        case_3: [{
            inherit:     'case_2',
            name:        'case_3',
            templateUrl: 'case_3.jst?' + Math.random(),
            title:       'Third Case',
            header:      'Third Case',
        }],

        case_4: [{
            inherit:     'case_3',
            name:        'case_4',
            templateUrl: 'case_4.jst?' + Math.random(),
            title:       'Fourth Case',
            header:      'Fourth Case',
        }],

        ce_test_1_1: [{
            inherit:   'question',
            name:      'ce_test_1_1',
            scriptUrl: 'ce_test_1_1.js?' + Math.random(),
            title:     'Continuing Education Test',
        }],

        ce_test_1_2: [{
            inherit:   'question',
            name:      'ce_test_1_2',
            scriptUrl: 'ce_test_1_2.js?' + Math.random(),
            title:     'Continuing Education Test',
        }],

        ce_test_1_3: [{
            inherit:   'question',
            name:      'ce_test_1_3',
            scriptUrl: 'ce_test_1_3.js?' + Math.random(),
            title:     'Continuing Education Test',
        }],

        ce_test_2_1: [{
            inherit:   'question',
            name:      'ce_test_2_1',
            scriptUrl: 'ce_test_2_1.js?' + Math.random(),
            title:     'Continuing Education Test',
        }],

        ce_test_2_2: [{
            inherit:   'question',
            name:      'ce_test_2_2',
            scriptUrl: 'ce_test_2_2.js?' + Math.random(),
            title:     'Continuing Education Test',
        }],

        ce_test_2_3: [{
            inherit:   'question',
            name:      'ce_test_2_3',
            scriptUrl: 'ce_test_2_3.js?' + Math.random(),
            title:     'Continuing Education Test',
        }],

        ce_test_3_1: [{
            inherit:   'question',
            name:      'ce_test_3_1',
            scriptUrl: 'ce_test_3_1.js?' + Math.random(),
            title:     'Continuing Education Test',
        }],

        ce_test_3_2: [{
            inherit:   'question',
            name:      'ce_test_3_2',
            scriptUrl: 'ce_test_3_2.js?' + Math.random(),
            title:     'Continuing Education Test',
        }],

        ce_test_3_3: [{
            inherit:   'question',
            name:      'ce_test_3_3',
            scriptUrl: 'ce_test_3_3.js?' + Math.random(),
            title:     'Continuing Education Test',
        }],

        ce_test_4_1: [{
            inherit:   'question',
            name:      'ce_test_4_1',
            scriptUrl: 'ce_test_4_1.js?' + Math.random(),
            title:     'Continuing Education Test',
        }],

        ce_test_4_2: [{
            inherit:   'question',
            name:      'ce_test_4_2',
            scriptUrl: 'ce_test_4_2.js?' + Math.random(),
            title:     'Continuing Education Test',
        }],

        ce_test_4_3: [{
            inherit:   'question',
            name:      'ce_test_4_3',
            scriptUrl: 'ce_test_4_3.js?' + Math.random(),
            title:     'Continuing Education Test',
        }],

        ce_test_5_1: [{
            inherit:   'question',
            name:      'ce_test_5_1',
            scriptUrl: 'ce_test_5_1.js?' + Math.random(),
            title:     'Continuing Education Test',
        }],

        ce_test_5_2: [{
            inherit:   'question',
            name:      'ce_test_5_2',
            scriptUrl: 'ce_test_5_2.js?' + Math.random(),
            title:     'Continuing Education Test',
        }],

        ce_test_5_3: [{
            inherit:   'question',
            name:      'ce_test_5_3',
            scriptUrl: 'ce_test_5_3.js?' + Math.random(),
            title:     'Continuing Education Test',
        }]ce_test_6_1: [{
            inherit:   'question',
            name:      'ce_test_6_1',
            scriptUrl: 'ce_test_6_1.js?' + Math.random(),
            title:     'Continuing Education Test',
        }],

        ce_test_6_2: [{
            inherit:   'question',
            name:      'ce_test_6_2',
            scriptUrl: 'ce_test_6_2.js?' + Math.random(),
            title:     'Continuing Education Test',
        }],

        ce_test_6_3: [{
            inherit:   'question',
            name:      'ce_test_6_3',
            scriptUrl: 'ce_test_6_3.js?' + Math.random(),
            title:     'Continuing Education Test',
        }],

        ce_test_7_1: [{
            inherit:   'question',
            name:      'ce_test_7_1',
            scriptUrl: 'ce_test_7_1.js?' + Math.random(),
            title:     'Continuing Education Test',
        }],

        ce_test_7_2: [{
            inherit:   'question',
            name:      'ce_test_7_2',
            scriptUrl: 'ce_test_7_2.js?' + Math.random(),
            title:     'Continuing Education Test',
        }],

        ce_test_7_3: [{
            inherit:   'question',
            name:      'ce_test_7_3',
            scriptUrl: 'ce_test_7_3.js?' + Math.random(),
            title:     'Continuing Education Test',
        }],

        ce_test_8_1: [{
            inherit:   'question',
            name:      'ce_test_8_1',
            scriptUrl: 'ce_test_8_1.js?' + Math.random(),
            title:     'Continuing Education Test',
        }],

        ce_test_8_2: [{
            inherit:   'question',
            name:      'ce_test_8_2',
            scriptUrl: 'ce_test_8_2.js?' + Math.random(),
            title:     'Continuing Education Test',
        }],

        ce_test_8_3: [{
            inherit:   'question',
            name:      'ce_test_8_3',
            scriptUrl: 'ce_test_8_3.js?' + Math.random(),
            title:     'Continuing Education Test',
        }],

        ce_test_email: [{
            inherit:   'question',
            name:      'ce_test_email',
            scriptUrl: 'ce_test_email.js?' + Math.random(),
            title:     'Continuing Education Test',
        }],

        ce_module_evaluation: [{
            inherit:    'question',
            name:       'ce_module_evaluation',
            scriptUrl:  'ce_module_evaluation.js?' + Math.random(),
            title:      'Teaching Module Evaluation',
            header:     'Welcome',
        }],

        ce_identification: [{
            inherit:    'question',
            name:       'ce_identification',
            scriptUrl:  'ce_identification.js?' + Math.random(),
            title:      'Your identification',
            header:     'Welcome',
        }],

        collect_iat_feedback: [{ // Get summarized iat feedback that was given to user, along with uuid.
          type: 'post',
          url:  'iat_feedback_csv.php',
          data: { header: 'uuid, pd_iat, id_iat',
                  uuid: '<%= global.participation.questions.uuid.response %>',
                  pd_iat: '<%= global.pd_iat.feedback %>',
                  id_iat: '<%= global.id_iat.feedback %>',
                },
        }],

        iat_results: [{
            inherit:     'results',
            name:        'iat_results',
            templateUrl: 'iat_results.jst?' + Math.random(),
            title:       'Final results',
            header:      'You have completed the study'
        }],

        iat_explanation: [{
            inherit:     'results',
            name:        'iat_explanation',
            templateUrl: 'iat_explanation.jst?' + Math.random(),
            title:       'About the IAT',
            header:      'About the IAT'
        }],

        // iat_results_csv: [{
        //     inherit:     'results',
        //     name:        'iat_results_csv',
        //     templateUrl: 'iat_results_csv.jst?' + Math.random(),
        //     title:       'Final results',
        //     header:      'You have completed the study'
        // }],

        course_goals: [{
            inherit:     'results',
            name:        'course_goals',
            templateUrl: 'course_goals.jst?' + Math.random(),
            title:       'Thank You',
            header:      'You have completed the study'
        }],

        thanks_declined: [{
            inherit:     'results',
            name:        'thanks_declined',
            templateUrl: 'thanks_declined.jst?' + Math.random(),
            title:       'Thank You',
            header:      'Declined',
        }],

        thanks: [{
            inherit:     'results',
            name:        'thanks',
            templateUrl: 'thanks.jst?' + Math.random(),
            title:       'Thank You',
            header:      'Thank You',
        }],

        thanks_ce: [{
            inherit:     'results',
            name:        'thanks_ce',
            templateUrl: 'thanks_ce.jst?' + Math.random(),
            title:       'Thank You',
            header:      'Thank You',
        }],
    });


    API.addSequence([
        // Each set of curly braces is a page.
        {inherit: 'participation'},
        { // Write out whether to recontact and other info from first page, uuid.
          type: 'postCsv',
          url:  'participants_csv.php',
        },
        { // If they choose to participate, start the module here.
          // If they decline to participate sends them to thanks anyway.
          mixer: 'branch',
          conditions: [
            {compare: 1, to: 'global.participation.questions.participate.response'} // figuring out that the question was in the question object and that there wasn't a participation object. Also, you can't have a . in the comparison or it won't parse correctly. I didn't try with a variable, maybe that'd fix it.
          ],
          data: [
            {  // now, continuing ed credit? If so display disclaimer
              mixer: 'branch',
              conditions: [
                {compare: 1, to: 'global.participation.questions.claim_credit.response'} // They're looking for credit
              ],
              data: [
                {inherit: 'ce_disclaimer'}
              ],
            },

            // First clinical_scenario_, which is used to track improvement after patient-centered teaching module
            {inherit: 'clinical_scenario_1'},
            {inherit: 'clinical_scenario_1_questions'},

            {inherit: 'clinical_scenario_2'},
            {inherit: 'clinical_scenario_2_questions'},

            // Demographics
            {inherit: 'demographics'},

            // // First IAT, for physical disabilities
            {inherit: 'pd_iat_instructions'},
            {inherit: 'pd_iat'},

            // // Second IAT, for intellectual disabilities
            {inherit: 'id_iat_instructions'},
            {inherit: 'id_iat'},

            {inherit: 'collect_iat_feedback'}, // Collect this immediately after IATs.

            // Explaining patient-centered counseling
            {inherit: 'counseling_introduction'},
            {inherit: 'counseling_what_is_it'},
            {inherit: 'counseling_challenges'},
            {inherit: 'counseling_refs'},

            // Patient-centered counseling scenarios for teaching
            {inherit: 'case_1_1'},
            {inherit: 'case_1_2'},
            {inherit: 'case_1_3'},
            {inherit: 'case_1_summary'},

            {inherit: 'case_2_1'},
            {inherit: 'case_2_2'},
            {inherit: 'case_2_3'},
            {inherit: 'case_2_summary'},

            {inherit: 'case_3_1'},
            {inherit: 'case_3_2'},
            {inherit: 'case_3_3'},
            {inherit: 'case_3_summary'},

            // Patient-centered counseling scenarios for post–teaching module follow-up testing
            {inherit: 'clinical_scenario_3'},
            {inherit: 'clinical_scenario_3_questions'},

            {inherit: 'clinical_scenario_4'},
            {inherit: 'clinical_scenario_4_questions'},
            // {inherit: 'console_check'},
            {inherit: 'course_goals'},
            {inherit: 'iat_explanation'},

            {  // Continuing ed credit? If so display quiz.
              mixer: 'branch',
              conditions: [
                {compare: 1, to: 'global.participation.questions.claim_credit.response'}
              ],
              data: [  // now, for each question ask three times, with slightly different text.

                /* Question 1 */
                {inherit: 'ce_test_1_1'},
                {
                  mixer: 'branch',
                  conditions: [
                     {compare: 3, to: 'global.ce_test_1_1.questions.ce_autonomous_patient_decisions.response'},
                  ],
                  elseData: [
                    {inherit: 'ce_test_1_2'},
                  ],
                },
                {
                  mixer: 'branch',
                  conditions: [{
                     or: [
                       {compare: 3, to: 'global.ce_test_1_1.questions.ce_autonomous_patient_decisions.response'},
                       {compare: 3, to: 'global.ce_test_1_2.questions.ce_autonomous_patient_decisions.response'},
                     ]
                  }],
                  elseData: [
                    {inherit: 'ce_test_1_3'},
                  ],
                },

                /* Question 2 */
                {inherit: 'ce_test_2_1'},
                {
                  mixer: 'branch',
                  conditions: [
                     {compare: 2, to: 'global.ce_test_2_1.questions.ce_first_step_pregnant.response'},
                  ],
                  elseData: [
                    {inherit: 'ce_test_2_2'},
                  ],
                },
                {
                  mixer: 'branch',
                  conditions: [{
                     or: [
                       {compare: 2, to: 'global.ce_test_2_1.questions.ce_first_step_pregnant.response'},
                       {compare: 2, to: 'global.ce_test_2_2.questions.ce_first_step_pregnant.response'},
                     ]
                  }],
                  elseData: [
                    {inherit: 'ce_test_2_3'},
                  ],
                },

                /* Question 3 */
                {inherit: 'ce_test_3_1'},
                {
                  mixer: 'branch',
                  conditions: [
                     {compare: 4, to: 'global.ce_test_3_1.questions.ce_exploring_desires.response'},
                  ],
                  elseData: [
                    {inherit: 'ce_test_3_2'},
                  ],
                },
                {
                  mixer: 'branch',
                  conditions: [{
                     or: [
                       {compare: 4, to: 'global.ce_test_3_1.questions.ce_exploring_desires.response'},
                       {compare: 4, to: 'global.ce_test_3_2.questions.ce_exploring_desires.response'},
                     ]
                  }],
                  elseData: [
                    {inherit: 'ce_test_3_3'},
                  ],
                },

                /* Question 4 */
                {inherit: 'ce_test_4_1'},
                {
                  mixer: 'branch',
                  conditions: [
                     {compare: 4, to: 'global.ce_test_4_1.questions.ce_pregnant_patient.response'},
                  ],
                  elseData: [
                    {inherit: 'ce_test_4_2'},
                  ],
                },
                {
                  mixer: 'branch',
                  conditions: [{
                     or: [
                       {compare: 4, to: 'global.ce_test_4_1.questions.ce_pregnant_patient.response'},
                       {compare: 4, to: 'global.ce_test_4_2.questions.ce_pregnant_patient.response'},
                     ]
                  }],
                  elseData: [
                    {inherit: 'ce_test_4_3'},
                  ],
                },

                /* Question 5 */
                {inherit: 'ce_test_5_1'},
                {
                  mixer: 'branch',
                  conditions: [
                     {compare: 2, to: 'global.ce_test_5_1.questions.ce_implicit_bias.response'},
                  ],
                  elseData: [
                    {inherit: 'ce_test_5_2'},
                  ],
                },
                {
                  mixer: 'branch',
                  conditions: [{
                     or: [
                       {compare: 2, to: 'global.ce_test_5_1.questions.ce_implicit_bias.response'},
                       {compare: 2, to: 'global.ce_test_5_2.questions.ce_implicit_bias.response'},
                     ]
                  }],
                  elseData: [
                    {inherit: 'ce_test_5_3'},
                  ],
                },

                /* Question 6 */
                {inherit: 'ce_test_6_1'},
                {
                  mixer: 'branch',
                  conditions: [
                     {compare: 1, to: 'global.ce_test_6_1.questions.ce_iat_measure.response'},
                  ],
                  elseData: [
                    {inherit: 'ce_test_6_2'},
                  ],
                },
                {
                  mixer: 'branch',
                  conditions: [{
                     or: [
                       {compare: 1, to: 'global.ce_test_6_1.questions.ce_iat_measure.response'},
                       {compare: 1, to: 'global.ce_test_6_2.questions.ce_iat_measure.response'},
                     ]
                  }],
                  elseData: [
                    {inherit: 'ce_test_6_3'},
                  ],
                },

                /* Question 7 */
                {inherit: 'ce_test_7_1'},
                {
                  mixer: 'branch',
                  conditions: [
                     {compare: 4, to: 'global.ce_test_7_1.questions.ce_not_in_iat.response'},
                  ],
                  elseData: [
                    {inherit: 'ce_test_7_2'},
                  ],
                },
                {
                  mixer: 'branch',
                  conditions: [{
                     or: [
                       {compare: 4, to: 'global.ce_test_7_1.questions.ce_not_in_iat.response'},
                       {compare: 4, to: 'global.ce_test_7_2.questions.ce_not_in_iat.response'},
                     ]
                  }],
                  elseData: [
                    {inherit: 'ce_test_7_3'},
                  ],
                },

                /* Question 8 */
                {inherit: 'ce_test_8_1'},
                {
                  mixer: 'branch',
                  conditions: [
                     {compare: 3, to: 'global.ce_test_8_1.questions.ce_iat_validated.response'},
                  ],
                  elseData: [
                    {inherit: 'ce_test_8_2'},
                  ],
                },
                {
                  mixer: 'branch',
                  conditions: [{
                     or: [
                       {compare: 3, to: 'global.ce_test_8_1.questions.ce_iat_validated.response'},
                       {compare: 3, to: 'global.ce_test_8_2.questions.ce_iat_validated.response'},
                     ]
                  }],
                  elseData: [
                    {inherit: 'ce_test_8_3'},
                  ],
                },

                {  // CME credit? If so, self-eval
                  mixer: 'branch',
                  conditions: [ // Need self-eval only for CEU, not CME.
                    {compare: 2, to: 'global.participation.questions.which_ce_credit.response'}
                  ],
                  data: [
                    {inherit: 'ce_module_evaluation'},
                  ]
                },
              ],
            },
            // {inherit: 'ce_identification'}, // This is already collected on participation page.

            { // Get all answers to everything except summarized iat feedback.
              type: 'postCsv',
              url:  'answers_csv.php',
            },
            {  // now, which thanks
              mixer: 'branch',
              conditions: [
                {compare: 1, to: 'global.participation.questions.claim_credit.response'} // They're looking for credit
              ],
              data: [ // continuing ed thanks
                { inherit: 'thanks_ce' },
              ],
              // No continuing ed, regular thanks
              elseData: [{inherit: 'thanks'}]
            },
          ],
          elseData:[{inherit: 'declined'}], // if they didn't participate
        },
    ]);
    return API.script;
});
