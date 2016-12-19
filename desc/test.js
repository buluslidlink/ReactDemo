export default function () {
    "use strict";
    alert('wwwwwww');
};

let obj={
	a:1
};

export {obj}

//export出的东西都会被放在module.exports对象的属性中，包括default，实为module.exports.default=xxx.