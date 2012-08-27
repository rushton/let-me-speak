/**
 * simple event handler for classes
 * @param object - object to attach to
 */ 
var eventuality = function(that){
   var registry = {};

   /**
    * fires set of events in the registry for given event
    * @param string - event to fire
    * @return void
    */
   that.fire = function(event){
      if (registry.hasOwnProperty(event)){
         var i, 
             handlers = registry[event];
         for (i=0; i < handlers.length; i++){
            handlers[i]();
         }
      }
   } // fire()

   /**
    * adds a new event to the registry
    * @param string - type of event to add to the registry
    * @param function - function to add to the registry
    * @return void
    */ 
   that.on = function(type,func){
      if (registry.hasOwnProperty(type)){
         registry[type].push(handler);
      }else{
         registry[type] = [func];
      }
   } // on()

   /**
    * @param string - type to get events for
    * @return array - array of functions
    */
   that.getEvents = function(type){
      return registry.hasOwnProperty(type) ? registry[type] : [];
   } // getEvents()
} // eventuality()

/**
 * represents a phrase
 * is essentially a stack in order to hold a state of what's been added
 * @todo define clearly what a phrase is
 */
var Phrase = function(){
      /**
       * @var object - reference for this object
       */
      var self = this;

      /**
       * "inherits" the eventuality class
       */
      eventuality(self);
      /**
       * @var array - pieces of the phrase
       */
      var pieces = [];

      return {
         /**
          * @param piece to push onto the stack
          * @return void
          */
         add : function(piece){
            pieces.push(piece.trim());
            self.fire('change');
         }, // add()

         /**
          * @return string - the full phrase joined by white space
          */
         get : function(){
            return pieces.join(' ');
         }, // get()

         /**
          * @return last element popped from the stack
          */
         pop : function(){
            var piece = pieces.pop();
            self.fire('change');
            return piece;
         }, // pop()

         /**
          * clears the stack
          * @return void
          */
         clear : function(){
            pieces = [];
            self.fire('change');
         }, // clear()

         /**
          * @param function - function to call when the stack has been changed
          * return void
          */
         change : function(func){
            self.on('change', func);
         }, // onchange()

         /**
          * @return self - a copy of self
          */
         copy : function() {
            var copy = new Phrase();
            var i;
            var events = self.getEvents('change');
            for(i = 0; i < pieces.length; i++){
               copy.add(pieces[i]);
            }

            for(i=0; i < events.length; i++){
               copy.change(events[i]);
            }
            return copy;
         } // copy()
      };

} // Phrase

var RecentPhrases = function(limit){

   /**
    * @var reference - to self
    */
   var self = this;

   /**
    * inherit events
    */
   eventuality(self);

   /**
    * @var int - number of recent phrases to limit to
    */
   this.limit = limit || Infinity;

   /**
    * @var array[Phrase] - array of phrases
    */
   this.phrases = [];

   return {
      /**
       * @param Phrase - phrase to add
       */
      add : function(phrase){
         self.phrases.unshift(phrase);
         self.phrases = self.phrases.slice(0,limit);
         self.fire('change');
      }, // add()

      /**
       * @param int - index to get
       * @return Phrase - a copy of the phrase
       */
      getIndexAt : function(index){
         return self.phrases[index].copy();
      }, // get()

      /**
       * @return array - phrases
       */
      get : function(){
         return self.phrases;
      }, // get()

      change : function(func){
         self.on('change',func);
      }
   }

} // RecentPhrases
