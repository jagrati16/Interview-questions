const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      entry.target.style.visibility = "hidden";
    } else {
      entry.target.style.visibility = "visible";
    }
  });
};

const options = {
  root: null,
  threshold: 1,
};

const observer = new IntersectionObserver(callback, options);

/** Adding buttons inside the div element and observing all the buttons */
const root = document.getElementById("observer-pattern");
const fragmentDiv = new DocumentFragment();
for (let i = 0; i < 20; i++) {
  const button = document.createElement("button");
  button.dataset.id = i;
  button.classList.add("my-button");
  button.innerText = `test-${i}`;
  fragmentDiv.appendChild(button);
  // observer button target
  observer.observe(button);
}
root.appendChild(fragmentDiv);
