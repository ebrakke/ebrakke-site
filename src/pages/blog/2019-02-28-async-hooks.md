---
templateKey: blog-post
title: Async Hooks with Observables
path: '/blog/async-hooks-with-observables/'
date: 2019-02-28
author: Erik Brakke
type: post
---

I was playing around with the new [React hooks](https://reactjs.org/docs/hooks-intro.html) API and wanted to come up with a way to call async functions from within a functional component. Furthermore, I wanted to give the component control of when to call this async function, and get loading state updates from the hook.

In essence, this is what I envisioned:

```tsx
import { useLazyAsync } from './hooks'
import { getUser } from './user'

export const MyComponent: React.FC = props => {
  const { loading, error, result, async$ } = useLazyAsync(getUser)
  // Users don't exists, perhaps we load from a cache or something
  if (!props.users.length) {
    async$.next()
  }
  return loading ? (
    <Loading />
  ) : (
    <div>{result.length} users have been loaded!</div>
  )
}
```

This allows a component to load data on demand, and also have the hook manage the `loading` state. I figured an observables and subjects would be the best way to accomplish this task from within the `useLazyAsync` hook. Here's the implementation

```tsx
import { useState, useEffect } from 'react'
import { Subject } from 'rxjs'
import { from, switchMap } from 'rxjs/operators'

export function useLazyAsync<T = any>(
  asyncFunc: () => Promise<T>,
  deps?: any[] = []
) {
  const asyncSubject = new Subject()
  const [asyncState, setAsyncState] = useState({ loading: false })

  // Setup the subject
  useEffect(() => {
    const async$ = asyncSubject
      .pipe(
        switchMap(val => {
          setAsyncState({ ...asyncState, loading: true })
          return from(asyncFunc)
        })
      )
      .subscribe(
        result =>
          setAsyncState({
            ...asyncState,
            error: undefined,
            result,
            loading: false,
          }),
        err =>
          setAsyncState({ ...asyncState, error: err.message, loading: false })
      )
    return async$.unsubscribe
  }, [])
  return { ...asyncState, async$: asyncSubject }
}
```

Now all the loading states and error handling can be offloaded onto the hook, and the component can just rely on the state values returned by `useLazyAsync`.

I'm not sure if this is an anti pattern, or if there are better ways to do it, but if I come across any manjor downsides, I'll update this post.

Credit to [@erichenry](https://github.com/EricHenry) for helping me with this implementation.
