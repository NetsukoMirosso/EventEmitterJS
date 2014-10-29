function EventEmitter(){
 this.callbacks = {}; 
}
 
 // Prototype de l'Event Emitter
EventEmitter.prototype = 
{
 // Fonction on : On est une fonction qui permet d’ajouter un event avec sa fonction, ou si l’event existe déjà, de lui ajouter la fonction.
  on: function(event, fn)
  {
    if(!this.callbacks.hasOwnProperty(event)) // Si l'event n'existe pas deja
    {
      this.callbacks[event] = [];  // on le créé
    }
 
    this.callbacks[event].push(fn); // Puis on lui ajoute la fonction desirée
    return this; //Retourner la fonction permet d'implémenter le chaining
  }, 
 
 // Fonction off : Off permet de retirer toutes les fonctions d’un event
  off: function(event)
  {   
    this.callbacks = [];        // Vide l'objet passé en paramètre, supprimant tout ce qu'il contient
    return this; //Retourner la fonction permet d'implémenter le chaining
  },
 
 // Fonction emit : lance toutes les fonctions de l’event passé en paramètre avec les arguments passés en paramètre. Supprimes les fonctions qui ont leur compteur à 0.
  emit: function(event /*, args */)
  {
      var args = Array.prototype.slice.call(arguments);
      args.shift();
      
      if(this.callbacks.hasOwnProperty(event))
      {
        this.callbacks[event].forEach(function(f)
        {
          f.apply(this, args);
        });
        
        return this; //Retourner la fonction permet d'implémenter le chaining
        
      } 
  }, 
  
  // Fonction once : ajoute une fonction a un event qui ne s'exécutera qu’une fois
  once: function(event, fn)
  {
      
    if(!this.callbacks.hasOwnProperty(event)) 
    {
      this.callbacks[event] = [];
    }
    var fnthis = this; //on recupère l'objet en question
    var oncefn = function()
    {
        fnthis.callbacks[event].splice((fnthis.callbacks[event].indexOf(oncefn)),2);
    };  
    this.callbacks[event].push(fn);
    this.callbacks[event].push(oncefn);    
    
  },
  
  
  // Fonction Times : ajoute une fonction a un event qui ne s'exécutera n fois
  times: function(event, num, fn)
  {  
      var n=0;
      if(!this.callbacks.hasOwnProperty(event))
      {
          this.callbacks[event]=[];
          
      }
      var timeThis = this;
      var timeFn = function()
      {
          n++;
          if(n===num)
          {
          var index = timeThis.callbacks[event].indexOf(fn);
          timeThis.callbacks[event].splice(index,2);
          }
      };
      this.callbacks[event].push(fn);
      this.callbacks[event].push(timeFn);
      return this;      
  } 
  
};
 