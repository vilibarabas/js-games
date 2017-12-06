
class WordsChallenge {
  constructor () {
    this.dataProvider();
  };

  dataProvider() {
    var data = {};
    var self = this;
    $.ajax({
        url: "words_provider.php",
        type: "POST",
        success: function(rez) {
          console.log(rez);
          rez = JSON.parse(rez);
          self.words = rez['words'];
          self.settings = rez['settings'];
          self.start();
        },
    });
  };

  start() {
    this.settings.selectors = {
      "main" : {
        "container" : "words-container",
        "word_container" : "word-container",
        "word_selector" : "word-selector-",
        "letter_class" : "letters",
        "letter_cintainer" : "letters-container"
      },
      "grid" : {
        "row_count" : 3,
        "col_count" : 5,
        "container" : "container",
        "row_class" : "row",
        "word_row_class" : "word-row-",
        "col_class" : "col-md-3",
        "word_col_class" : "word-col-"
      },
      "custom" : {
        "letters_container" : "letters-base-container",
        "letters_drag" : "letters-drag"
      }
    }
    this.settings.style = {
      "color" : {
        "empty_letter" : "#0066cc",
        "changed_letter" : "green",
        "valid_word_container" : "#ff9933",
        "valid_word_letter" : "#262626"
      }
    };

    this.words_data = [];
    var render = new WordsContainersRender(this.words, this.settings);
    this.words_data = render.create();
  }
}

class WordsContainersRender {
  constructor(words, settings) {
    this.words = words;
    this.settings = settings;
    this.gridCels = [];
    this.words_data = {};
  };

  create() {
    this.wordsContainerRender();

    this.lettersContainerRender();
    return this.words_data;
  }

  wordsContainerRender() {
    var grid = this.createBootstrapGridRender();
    var base_container = $("." + this.settings.selectors.main.container);
    base_container.append(grid);
    var empty_cell = this.gridCels;

    for(var i = 0; i < this.words.cuv_list.length; i++) {
      var word_container = this.wordImputCreate(this.words.cuv_list[i], i);
      this.appendCell(word_container, this.words.cuv_list[i], i, empty_cell);
    }
  }

  appendCell(word_container, word, key, empty_cell) {
    var data = {};
    if(data.cell_attributes = this.getEmptyCell(empty_cell)) {
      data.container = $("." + this.settings.selectors.grid.word_row_class + data.cell_attributes.row).find("." + this.settings.selectors.grid.word_col_class + data.cell_attributes.col);
      data.container.append(word_container);
      data.word = word;
      this.words_data[this.settings.selectors.main.word_selector + key] = data;
    }
  }

  getEmptyCell(cells) {
    while(1) {
      var max = (cells.length-1);

      if(max < 0) {
        return false;
      }

      var cell = this.randomIntFromInterval(0, max);
      if(cells[cell].empty) {
        var return_cell = cells[cell];
        cells.splice(cell, 1);
        return return_cell;
      }
    }
  }

  randomIntFromInterval(min,max) {

    return Math.floor(Math.random()*(max-min+1)+min);
  }

  wordImputCreate(word, key) {
    var element = $("<div></div>");
    element.addClass(this.settings.selectors.main.word_container);
    element.attr('id', this.settings.selectors.main.word_selector + key);
    //element.html(word);
    for(var i = 0; i < word.length; i++) {
      var letter = $("<div></div>");
      letter.addClass(this.settings.selectors.main.letter_class);
      this.attacheropable(letter);
      element.append(letter);
    }
    return element;
  }

  createBootstrapGridRender() {
    var container = $("<div></div>");
    this.gridCels = new Array();
    container.addClass(this.settings.selectors.grid.container);
    for(var i = 0; i < this.settings.selectors.grid.row_count; i++) {
      var row = $("<div></div>");
      row.addClass(this.settings.selectors.grid.row_class);
      row.addClass(this.settings.selectors.grid.word_row_class + (i+1));
      for(var j = 0; j < this.settings.selectors.grid.col_count; j++) {
        var col = $("<div></div>");
        col.addClass(this.settings.selectors.grid.col_class);
        col.addClass(this.settings.selectors.grid.word_col_class + (j+1));
        row.append(col);
        var cell = {};
        cell.empty = true;
        cell.row = i + 1;
        cell.col = j + 1;
        this.gridCels.push(cell);
      }
      container.append(row);
    }
    return container;
  }

  createHtmlElement(tagName, attribute, value) {
    var element = $(tagName);
    if(attribute == "class") {
      element.addClass(attribute);
    }
  }

  lettersContainerRender() {
    var letters_container = $("." + this.settings.selectors.main.letter_cintainer);
    var letters = this.words.letters;
    var container = $("<div></div>");
    var container_2 = $("<div></div>");
    container.addClass(this.settings.selectors.custom.letters_container);
    container_2.addClass(this.settings.selectors.grid.container);
    for(var letter in letters) {
      var letter_container = $("<span></span>");
      letter_container.addClass(this.settings.selectors.main.letter_class);
      letter_container.addClass(this.settings.selectors.custom.letters_drag);
      letter_container.html(letters[letter]);
      this.attacheDraggable(letter_container);
      container_2.append(letter_container);
    }
    container.append(container_2);
    letters_container.append(container);
  }

  attacheDraggable(letter) {
    letter.draggable( {
      revert: true,
      cursor:"clone"
    } );
  }

  attacheropable(letter) {
    var self = this;
    letter.droppable({
      drop: function( event, ui ) {
        var text = $(ui.draggable).html();
        var element = $(event.target);
        element.html(text);
        element.css({'background-color': self.settings.style.color.changed_letter})
        self.checkComplateWord($(event.target));
      }
    });

    letter.on("click", function() {
      $(this).html('');
      $(this).css({'background-color': self.settings.style.color.empty_letter})
    });
  }

  checkComplateWord(letter) {
    var container = $(letter).parent();
    var selector = container.attr('id');

    if(this.words_data[selector]) {
      var word = this.getAllLetters(container);
      if(word) {
        if(this.checkValidWord(word)) {
          this.setCompleteWord(container);
        }
      }
    }
  }

  checkValidWord(word) {
    for(var word_data in this.words_data) {
      if(word == this.words_data[word_data].word) {
        if(!this.words_data[word_data].exist) {
          this.words_data[word_data].exist = 1;
          return true;
        }
      }
    }

    return false;
  }

  setCompleteWord(container) {

    var elClone = container.clone();
    elClone.css("background-color", this.settings.style.color.valid_word_container)
    elClone.children().css("background-color", this.settings.style.color.valid_word_letter);
    container.parent().find(container).replaceWith(elClone);
  }

  getAllLetters(container) {
    var letters = container.find('.' + this.settings.selectors.main.letter_class);
    var word = '';
    letters.each(function() {
      var letter = $( this ).html();
      console.log("<" + letter + ">");
      if(letter) {
        word += letter;
      }
      else{
        return false;
      }
    });

    return word;
  }
}

$(document).ready(function() {
    new WordsChallenge();
});
