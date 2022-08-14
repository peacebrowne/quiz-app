let current_section = '#login';

/**
 * General Functions
 */
const hideElement = (ele) => {
    document.querySelector(ele).style = "display: none";
}

const showElement = (ele) => {
    document.querySelector(ele).style = "display: block";
}

const setAsActive = (ele) => {
    document.querySelector(ele).style = "color:rgba(201,0,40,255)";

}

const setAsInactive = (ele) => {
    document.querySelector(ele).style = "color: black;";
}