define(['questAPI'], function(Quest){
    var API = new Quest();

    API.addSequence([
        { // page begins
            header: '<p style="font-weight: 400; font-size: 15px; color: black; line-height: 1.4em; width: 75%;">A couple, Mr. and Mrs. J, comes to you after learning that they are expecting a male child. Mrs. J tells you about her family history of Becker Muscular Dystrophy (BMD) and that she knows that she is a carrier for the disease. BMD is an X-linked condition that causes progressive skeletal muscle weakness and cardiomyopathy. BMD typically presents in childhood or adolescence and has an average lifespan of 40 to 50 years. The phenotype typically presents only with physical aspects to the condition. Your patient is concerned about her risk for passing on BMD, and she asks you to perform genetic testing to determine if the fetus has Becker Muscular Dystrophy.</p>Select an answer from the choices below',
            questions: [
                { // question 1 begins
                    name: 'question1',
                    type: 'selectOne',
                    stem: 'The parents tell you they would terminate the pregnancy, if the fetus were found to have BMD. If you were the patient’s healthcare provider, how would you counsel the couple about testing?',
                    autoSubmit: false,
                    answers: [
                               'Strongly recommend prenatal testing',
                               'Recommend prenatal testing',
                               'Offer but neither recommend nor discourage prenatal testing',
                               'Discourage prenatal testing',
                               'Strongly discourage prenatal testing',
                    ],
                    required: true,
                },
                { // question 2 begins
                    name: 'question2',
                    type: 'selectOne',
                    stem: 'The parents tell you they would NOT terminate the pregnancy if the fetus were found to have BMD. If you were the patient’s healthcare provider, how would you counsel the couple about testing?',
                    autoSubmit: false,
                    answers: [
                               'Strongly recommend prenatal testing',
                               'Recommend prenatal testing',
                               'Offer but neither recommend nor discourage prenatal testing',
                               'Discourage prenatal testing',
                               'Strongly discourage prenatal testing',
                    ],
                    required: true,
                },
                { // question 3 begins
                    name: 'question3',
                    type: 'selectOne',
                    stem: 'If you were personally the patient, would you get prenatal genetic testing for BMD during the pregnancy?',
                    autoSubmit: false,
                    answers: [
                               'Yes',
                               'Most likely',
                               'Unsure',
                               'Probably not',
                               'No',
                    ],
                    required: true,
                },
                { // question 4 begins
                    name: 'question4',
                    type: 'selectOne',
                    stem: 'If you were personally the patient, if the fetus were found to be affected with BMD, would you seek to terminate the pregnancy?',
                    autoSubmit: false,
                    answers: [
                               'Yes',
                               'Most likely',
                               'Unsure',
                               'Probably not',
                               'No',
                    ],
                    required: true,
                },
                { // question 5 begins
                    name: 'question5',
                    type: 'selectOne',
                    stem: 'The impact BMD has on physical abilities has had the following influence on my above decisions:',
                    autoSubmit: false,
                    answers: [
                               'Great influence',
                               'Moderate influence',
                               'Neutral',
                               'Little influence',
                               'No influence',
                    ],
                    required: true,
                },
            ]
        } // page ends
    ]);

    return API.script;
});
