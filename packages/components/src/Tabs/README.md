Component used to navigate across multiple views. It is composed of multiple `<Tab />` components.

### Usage

```jsx
class ComponentWithTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(tabIndex) {
    this.setState({
      tabIndex
    })
  }

  render() {
    return (
      <Tabs onChange={this.handleChange} active={this.state.tabIndex}>
        <Tab title="Tab 1">
          <div>
            <h3>Example panel 1</h3>
            <p>
              Sunt do fugiat non est cupidatat ad et nisi. Adipisicing mollit veniam officia do id. Consequat
              voluptate excepteur ex duis qui adipisicing exercitation minim nostrud non aliquip culpa enim. Aute non
              adipisicing in officia tempor cupidatat culpa fugiat elit sunt nisi eu esse.
            </p>
          </div>
        </Tab>
        <Tab title="Tab 2">
          <div>
            <h3>Example panel 2</h3>
            <p>
              Ex occaecat est esse consectetur labore id sint id ut. Lorem commodo adipisicing ad adipisicing ea
              consectetur esse minim anim pariatur. Excepteur est elit mollit sunt qui excepteur minim fugiat.
            </p>
          </div>
        </Tab>
        <Tab title="Tab 3" disabled>
          <div>
            <h3>Example panel 3</h3>
            <p>
              Non et esse reprehenderit elit in ad nulla mollit. Fugiat nulla consequat esse do est. Enim cupidatat
              sit ullamco pariatur ullamco commodo ipsum deserunt deserunt dolor minim sit magna. Duis adipisicing
              irure irure incididunt non cupidatat est ipsum deserunt ex qui adipisicing.
            </p>
          </div>
        </Tab>
      </Tabs>
    )
  }
};

<ComponentWithTab />
```
