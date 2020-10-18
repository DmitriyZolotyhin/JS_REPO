import './toggle-style.sass'

class NodeToggler {
  constructor(class_name) {
    this.node_to_toggle = document.querySelector(class_name)
    this.node_to_toggle.addEventListener('click', () => {
      this.triggerNode()
    })
  }

  triggerNode () {
    this.node_to_toggle.classList.toggle('active')
  }
}
export default NodeToggler