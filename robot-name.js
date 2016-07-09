module.exports = (function () {

    var nameTrash = [];

    function RobotName() {
        this.reset();
    }

    RobotName.prototype.getTrashSize = function () {
        return nameTrash.length;
    }

    RobotName.prototype.reset = function () {

        this.name = this.generateNewName();

        if (!this.nameUsed(this.name)) {
            nameTrash.push(this.name);
        }
    }

    RobotName.prototype.generateNewName = function () {
        var name = null;

        while (this.nameIsInvalid(name)) {
            var randomThreeDigits = this.generateRandomThreeDigits();

            name = this.prependTwoRandomUpperCaseCharactersWithUniqueResult(randomThreeDigits.toString());
        }

        return name;
    }

    RobotName.prototype.nameIsInvalid = function (name) {
        return this.nameUsed(name)
            || name == null;
    }

    RobotName.prototype.nameUsed = function (name) {
        return nameTrash.indexOf(name) >= 0;
    }

    RobotName.prototype.prependTwoRandomUpperCaseCharactersWithUniqueResult = function (threeDigitString) {

        var randomTwoCharacters = this.generateRandomTwoCharacters();

        var resultString = randomTwoCharacters + threeDigitString;

        if (this.nameIsInvalid(resultString)) {
            return this.prependTwoRandomUpperCaseCharactersWithUniqueResult(threeDigitString);
        }

        return resultString;
    }

    RobotName.prototype.generateRandomThreeDigits = function () {
        return this.generateRandomPositiveInteger(100, 999);
    }

    RobotName.prototype.generateRandomPositiveInteger = function (minLength, maxLength) {
        var number = -1;

        while (number < minLength) {
            number += Math.floor(Math.random() * (maxLength + 1));

            if (number > maxLength) {
                number = parseInt(number.toString().substr(0, 3));
            }
        }

        return number;
    }

    RobotName.prototype.generateRandomTwoCharacters = function () {

        var randomNumber1 = this.generateRandomPositiveInteger(0, 25);
        var randomNumber2 = this.generateRandomPositiveInteger(0, 25);

        return this.integerToCharacters(randomNumber1) + this.integerToCharacters(randomNumber2);
    }

    RobotName.prototype.integerToCharacters = function (integer) {

        var intString = integer.toString();

        return this.digitStringToCharString(intString);
    }

    RobotName.prototype.digitStringToCharString = function (digitString) {
        var charCode = 65 + parseInt(digitString);

        return String.fromCharCode(charCode);
    }

    return RobotName;
})();