import type { Component } from "solid-js";
import Showcase from './showcase'

import logo from "./logo.svg";
import styles from "./App.module.css";
import { Router } from "solid-app-router";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
        <Router>
          <Showcase />
        </Router>
      </header>
    </div>
  );
};

export default App;
