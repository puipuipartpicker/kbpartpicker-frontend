//@ts-ignore
// TODO: function to replace CSS variables with the theme corresponding to the category


// gets the value of desired CSS variable
window.getComputedStyle(document.documentElement).getPropertyValue('--margin-side')

// set the value of desired CSS variable

document.documentElement.style.setProperty('--margin-side', '200rem')