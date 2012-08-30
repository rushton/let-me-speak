/**
 * global namespace for the app
 */
App = {};

/**
 * various preferences for the app
 *
 * speak - holds configuration options for the text-to-speech
 * speakOnClick - tells whether the application should do text-to-speech after every fragment click
 * mute - turns off text-to-speech altogether, overrides other configurations
 */
App.preferences = {
   speak: {
            amplitude: 100,
            pitch: 50,
            speed: 175,
            wordgap: 2
          },
   speakOnClick: false,
   mute: false
};
