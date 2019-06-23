define([document.querySelector('[pi-manager]').getAttribute('pi-manager').replace(/[^/]+$/g, 'stiat5.js')], function(stiatExtension){
  return stiatExtension(
    {
      remindErrorText: '<p align="center" style="font-size:"4em"; font-family:arial">' +
      'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' +
      'Press the other key to continue.<p/>',
      // Define the category.
      category:
      {
        name: 'Intellectual disability', // Category label.
        title: {
          media: {word: 'Intellectual disability'}, // Name of the category presented in the task.
          css: {color:'#31940F','font-size':'2.3em'}, // Style of the category title.
          height: 4 // Used to position the "Or" in the combined block.
        },
        media: [ // Stimuli
          {word: 'Dependent'},
          {word: 'Mental handicap'},
          {word: 'Slow learner'},
          {word: 'Impaired'},
          {word: 'Special needs'},
        ],
        // Can change color and size of the targets here.
        css: {color:'#0000FF','font-size': '2.3em'},
      },
      attribute1:
      {
        name: 'Bad', // Attribute label
        title: {
          media: {word: 'Bad'},
                css: {color:'#0000FF','font-size':'2.3em'},
                height: 4 // Used to position the "Or" in the combined block.
        },
        media: [ // Stimuli
          {word: 'Horrible'},
          {word: 'Hate'},
          {word: 'Poison'},
          {word: 'Yucky'},
          {word: 'Bothersome'},
          {word: 'Angry'},
          {word: 'Abuse'},
          {word: 'Disaster'},
        ],
        // Can change color and size of the targets here.
        css: {color:'#0000FF','font-size':'2.3em'},
      },
      attribute2:
      {
        name: 'Good', // Attribute label
        title: {
          media: {word: 'Good'}, // Name of the category presented in the task.
          css: {color:'#0000FF','font-size':'1.8em'},
                height: 4 // Used to position the "Or" in combined block.
        },
        media: [ // Stimuli
          {word: 'Lovely'},
          {word: 'Fabulous'},
          {word: 'Attractive'},
          {word: 'Friend'},
          {word: 'Fantastic'},
          {word: 'Friendship'},
          {word: 'Cherish'},
          {word: 'Magnificent'},
        ],
        // Can change color and size of the targets here.
        css: {color:'#0000FF','font-size':'2.3em'},
      }
    }
  );
});








