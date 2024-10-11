class CreateHtmlElementsBySettings {
  constructor(settings, events, cutsomClass) {
    this.settings = settings;
    this.eventsHelperClass = events;
    this.cutsomClass = cutsomClass;
    this.defaultTagName = 'div';
    return this.init();
  };

  init() {
    return this.createElement(this.settings);
  }

  createElementChildrens(htmlElement, childs) {
    for(var i in childs ) {
      if(childs[i].count) {
        for(var j = 1; j <= childs[i].count; j++) {
          childs[i].attr.data = j;
          htmlElement.append(this.createElement(childs[i]));
        }
      }
      else{
        htmlElement.append(this.createElement(childs[i]));
      }
    }
  }

  createElement(element) {
    var htmlElement = $("<" + this.defaultTagName + ">");
      if(element['tag'])
        htmlElement = $("<" + element['tag'] + ">");
      if(element.class) {
        htmlElement.addClass(element.class);
      }

      if(element.text) {
        htmlElement.html(element.text);
      }

      if(element.event) {
        this.eventsHelperClass[element.event](htmlElement, this.cutsomClass);
      }

      if(element['attr']) {
        for(var attr in element['attr'])
          htmlElement.attr(attr, element['attr'][attr]);
      }

      if(element.child) {
        this.createElementChildrens(htmlElement, element.child);
      }
    return htmlElement;
  }
}
