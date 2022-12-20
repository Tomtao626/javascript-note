function fn(a) {
    console.log(a);
    var a = 666;
    console.log(a);
    function a() {}
    console.log(a);
    var b = function() {};
    console.log(b);
    function c() {}
}
fn(1);