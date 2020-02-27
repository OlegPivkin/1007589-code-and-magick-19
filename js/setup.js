'use strict';

var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_NUMBER = 4;

var randomElement = function (element) {
  var rand = Math.floor(Math.random() * element.length);
  return element[rand];
};

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var createWizards = function (wizardsNumber) {
  var wizards = [];
  for (var i = 0; i < wizardsNumber; i++) {
    var wizard = {
      name: randomElement(WIZARD_FIRST_NAMES) + ' ' + randomElement(WIZARD_LAST_NAMES),
      coatColor: randomElement(COAT_COLORS),
      eyesColor: randomElement(EYES_COLORS)
    };
    wizards.push(wizard);
  }
  return wizards;
};

var createWizardElement = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;

  return wizardElement;
};

var createList = function (list) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < list.length; i++) {
    fragment.appendChild(createWizardElement(list[i]));
  }
  similarListElement.appendChild(fragment);
  return fragment;
};

var wizards = createWizards(WIZARD_NUMBER);
createList(wizards);

document.querySelector('.setup-similar').classList.remove('hidden');
document.querySelector('.setup').classList.remove('hidden');
