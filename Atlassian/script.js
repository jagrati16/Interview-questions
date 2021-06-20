function createContent(text) {
  const div = document.createElement("div");
  div.classList.add("test");
  div.appendChild(document.createTextNode(text));
  return div;
}

const tabs = [
  {
    name: "content 1",
    content: createContent("This is content 1"),
  },
  {
    name: "content 2",
    content: createContent("This is content 2"),
  },
  {
    name: "content 3",
    content: createContent("This is content 3"),
  },
];

let selectedTab = null;
const root = document.getElementById("tabs");
const contentContainer = document.getElementById("content");

function tab({ name }, fragment) {
  const button = document.createElement("button");
  button.classList.add("tab");
  button.dataset.name = name;
  button.appendChild(document.createTextNode(name));
  fragment.appendChild(button);
}

function clicked(target, { content }) {
  const elements = document.querySelectorAll(".tab");
  for (ele of elements) {
    ele.classList.remove("selected");
  }
  target.classList.add("selected");
  contentContainer.innerHTML = "";
  contentContainer.appendChild(content);
}

function renderTabs(tabs) {
  const fragment = document.createDocumentFragment("div");
  tabs.forEach((data) => {
    tab(data, fragment);
  });
  root.appendChild(fragment);
  root.addEventListener("click", (e) => {
    const tabname = e.target.dataset.name;
    selectedTab = tabname;
    const tab = tabs.find((tab) => {
      return tab.name === tabname;
    });
    clicked(e.target, tab);
  });
}

renderTabs(tabs);

const RenderDish = ({ dish }) => {
  return (
    <Card>
      <CardImg top src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
};
