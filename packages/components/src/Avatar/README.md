### Simple avatar with name (initial only)

```jsx
<>
  <Avatar showName name="Franklin Green" />
  <Avatar showName name="Tejas Kumar" />
  <Avatar showName name="Fabien Bernard" />
</>
```

### Show full name next to the avatar circle

```jsx
<Avatar showName name="Franklin Green" />
```

### Color the avatar circle with a custom or named theme color

```jsx
<>
  <Avatar showName color="#002395" name="Franklin Green" />
  <Avatar showName color="#FFFFFF" name="Franklin Green" />
  <Avatar showName color="#ED2939" name="Franklin Green" />
</>
```

### Display a photo instead of solid colors.

This will automatically hide the initials

```jsx
<Avatar photo="http://thecatapi.com/api/images/get?format=src&size=small" name="Franklin Green" />
```

### Should be also beautiful on a dark background

```jsx
<div style={{ backgroundColor: "#333333", padding: 10 }}>
  <Avatar photo="http://thecatapi.com/api/images/get?format=src&size=small" name="Franklin Green" />
</div>
```
