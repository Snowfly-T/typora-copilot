/* eslint-disable @typescript-eslint/consistent-type-imports */

/**
 * The `child_process.fork()` method is a special case of {@link spawn} used specifically to spawn new Node.js processes.
 * Like {@link spawn}, a `ChildProcess` object is returned. The
 * returned `ChildProcess` will have an additional communication channel
 * built-in that allows messages to be passed back and forth between the parent and
 * child. See `subprocess.send()` for details.
 *
 * Keep in mind that spawned Node.js child processes are
 * independent of the parent with exception of the IPC communication channel
 * that is established between the two. Each process has its own memory, with
 * their own V8 instances. Because of the additional resource allocations
 * required, spawning a large number of child Node.js processes is not
 * recommended.
 *
 * By default, `child_process.fork()` will spawn new Node.js instances using the `process.execPath` of the parent process. The `execPath` property in the`options` object allows for an alternative
 * execution path to be used.
 *
 * Node.js processes launched with a custom `execPath` will communicate with the
 * parent process using the file descriptor (fd) identified using the
 * environment variable `NODE_CHANNEL_FD` on the child process.
 *
 * Unlike the [`fork(2)`](http://man7.org/linux/man-pages/man2/fork.2.html) POSIX system call, `child_process.fork()` does not clone the
 * current process.
 *
 * The `shell` option available in {@link spawn} is not supported by`child_process.fork()` and will be ignored if set.
 *
 * If the `signal` option is enabled, calling `.abort()` on the corresponding`AbortController` is similar to calling `.kill()` on the child process except
 * the error passed to the callback will be an `AbortError`:
 *
 * ```js
 * if (process.argv[2] === 'child') {
 *   setTimeout(() => {
 *     console.log(`Hello from ${process.argv[2]}!`);
 *   }, 1_000);
 * } else {
 *   const { fork } = require('node:child_process');
 *   const controller = new AbortController();
 *   const { signal } = controller;
 *   const child = fork(__filename, ['child'], { signal });
 *   child.on('error', (err) => {
 *     // This will be called with err being an AbortError if the controller aborts
 *   });
 *   controller.abort(); // Stops the child process
 * }
 * ```
 * @param modulePath The module to run in the child.
 * @param args List of string arguments.
 */
export const fork = (
  window.reqnode?.("child_process") ?? {
    fork: () => {
      throw new Error("child_process is not supported in browser");
    },
  }
).fork;

export type * from "node:child_process";
