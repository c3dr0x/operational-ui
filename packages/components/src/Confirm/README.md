This component is a confirm modal that should use on any risky user actions (delete something for example).

To have the correct style, this `Confirm` must be the first child of a `PageArea` as describe in the following examples.

### Usage

```jsx
<Page title="Delete the internet">
  <Confirm>
    {confirm => (
      <Card title="The red button">
        <p>
          The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil
          men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of
          darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon
          thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you
          will know My name is the Lord when I lay My vengeance upon thee.
        </p>
        <p>Generated by http://slipsum.com/</p>
        <Button
          color="error"
          onClick={() =>
            confirm({
              title: "Are you sure?",
              body: (
                <>
                  <p>This action will delete the entire internet</p>
                  <p>You can continue safely if you are a bad guy!</p>
                </>
              ),
              cancelButton: <Button color="success">I'm feel guilty :-/</Button>,
              actionButton: <Button color="error">I'm a bad guy!</Button>,
              onConfirm: () => alert("boooooommm!"),
            })
          }
        >
          Delete the internet
        </Button>
      </Card>
    )}
  </Confirm>
</Page>
```
