# React 16.3: Maintaining scroll position with getSnapshotBeforeUpdate and componentDidUpdate

We demo a message log that has messages added to it every 0.5 seconds.
Using `getSnapshotBeforeUpdate` and `componentDidUpdate` we check to see if the user is scrolled to the bottom of the window. If they are, we want to keep their scroll position as new items are added to the log.

**Start dev server**

```
npm install
npm start
```
