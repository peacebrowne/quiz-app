/**
 * returning node element based on the specified class or id value;
 * @param {value} - class or id attribute value;
 * @returns {node element} - node element
 */
const element = value => {
    return document.querySelector(value)
}

const elementAll = value => {
    return document.querySelectorAll(`${value}`)
}

/**
 * Hides the specified html element from the html documentif it's available.
 *  *  @param ele - html element
 */
const hideEle = ele => element(ele).style.display = 'none'

/**
 * Display the specified html element from the html document if it's available.
 *  *  @param ele - html element
 *  * @param dis - display value
 */
const showEle = ele => element(ele).style.display = 'block';


/**
 * Removes a class value from an element
 * @param {ele} - node element
 * @param {clas} - Class to remove from the specified html element.
 */
const remove_class = (ele,clas) => ele.classList.remove(clas)

/**
 * Add a class value to an element
 * @param {ele} - node element
 * @param {clas} - Class to be added to the specified html element.
 */
const add_class = (ele,clas) => ele.classList.add(clas);

/**
 * @param {ele} - Query the DOM for specified element and make it visible.
 */
const show_ele = (ele,val) => ele.style.display = val;

/**
 * @param {ele} - Query the DOM for specified element and make it hidden.
*/
const hide_ele = (ele,val) => ele.style.display = val;
