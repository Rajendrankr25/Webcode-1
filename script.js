//Implement the Open Brewery API using async/await with fetch;

//Functions;
function tagWithClass(tagname, attrname, attrvalue) {
    var ele = document.createElement(tagname);
    ele.setAttribute(attrname, attrvalue);
    return ele;
}
function tagWithContent(tagname, content) {
    var ele = document.createElement(tagname);
    ele.innerHTML = content;
    return ele;
}
function tag(tagname) {
    var ele = document.createElement(tagname);
    return ele;
}

//Elements creation;
let container = tagWithClass("div", "class", "container");
let navbar = tagWithClass("nav", "class", "navbar navbar-dark bg-dark");
let navtitle = tagWithClass("span", "class", "navbar-brand mb-0 h1");
navtitle.innerHTML = "Welcome to Brewery World!!!";
let heading = tagWithContent("h1", "Open Brewery DB");
let desc1 = tagWithContent("span", "Here you can get the name, type, address, website and phone number of Breweries...");
let desc2 = tagWithContent("span", "Filter by type of Brewery.");
let desc3 = tagWithContent("span", "Must be one of:")
let sm = tag("small");
let list = tag("ul");
let listItem1 = tagWithContent("li", "micro - Most craft breweries.");
let listItem2 = tagWithContent("li", "nano - An extremely small brewery which typically only distributes locally.");
let listItem3 = tagWithContent("li", "regional - A regional location of an expanded brewery.");
let listItem4 = tagWithContent("li", "brewpub - A beer-focused restaurant or restaurant/bar with a brewery on-premise.");
let listItem5 = tagWithContent("li", "large - A very large brewery. Likely not for visitors.");
let listItem6 = tagWithContent("li", "planning - A brewery in planning or not yet opened to the public.");
let listItem7 = tagWithContent("li", "bar - A bar. No brewery equipment on premise.");
let listItem8 = tagWithContent("li", "contract - A brewery that uses another brewery’s equipment.");
let listItem9 = tagWithContent("li", "proprietor - Similar to contract brewing but refers more to a brewery incubator.");
let listItem10 = tagWithContent("li", "closed - A location which has been closed.");
let searchBox = tagWithClass("input", "type", "text");
searchBox.setAttribute("class", "form-control form-control-md");
searchBox.setAttribute("id", "search");
searchBox.setAttribute("placeholder", "enter brewery type - .e.g. micro, large etc...");
let button = tagWithClass("button", "type", "button");
button.setAttribute("class", "btn btn-outline-warning");
button.setAttribute("id", "button");
button.addEventListener("click", brewery);
button.innerHTML = "Click to Search";
let br1 = tag("br");
let br2 = tag("br");

//Appending;
sm.append(desc3);
desc3.append(list);
list.append(listItem1, listItem2, listItem3, listItem4, listItem5, listItem6, listItem7, listItem8, listItem9, listItem10);
container.append(heading, desc1, br1, desc2, br2, sm, searchBox, button);
navbar.append(navtitle);
document.body.append(navbar, container);

//Interaction with API;
async function brewery() {
    try {
        let userInput = document.getElementById("search").value;
        let data = await fetch(`https://api.openbrewerydb.org/breweries?by_type=${userInput}`);
        let data1 = await data.json();
        console.log(data1);
        alert(`
            Hi, thank your for searching...

            Find the details of Breweries below.
        
            Click Ok to Continue`);
        for (var i = 0; i < data1.length; i++) {
            let card = document.createElement("div");
            card.setAttribute("class", "card text-black bg-warning mb-3 col-md-4");
            card.setAttribute("style", "max-width: 50%;");
            let bname = document.createElement("div");
            bname.innerHTML = `<br>Brewery Name : <b>${data1[i].name}`;
            let type = document.createElement("div");
            type.innerHTML = `Brewery Type : <b>${data1[i].brewery_type}`;
            let address = document.createElement("div");
            address.innerHTML = `Address : <b>${data1[i].street}, ${data1[i].city}, ${data1[i].state}`;
            let web = document.createElement("div");
            web.innerHTML = `Website URL : <b>${data1[i].website_url}`;
            let phone = document.createElement("div");
            phone.innerHTML = `Phone Number : <b>${data1[i].phone}`
            card.append(bname, type, address, web, phone);
            container.append(card);
        }
    } catch (error) {
        console.log(error);
    }
}