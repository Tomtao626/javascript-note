var Hello = "Hello World";
console.log(Hello);
var Site = /** @class */ (function () {
    function Site() {
    }
    Site.prototype.name = function () {
        console.log('tomtao626');
    };
    return Site;
}());
var obj = new Site();
obj.name();