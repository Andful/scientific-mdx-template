import React from "react";
import Head from "next/head";
import { Previewer } from "pagedjs";

export default class Main extends React.PureComponent {
  ref: React.RefObject<HTMLDivElement>;
  pagedRef: React.RefObject<HTMLDivElement>;
  constructor(props: {}) {
    super(props);
    this.ref = React.createRef();
    this.pagedRef = React.createRef();
  }
  async componentDidMount() {
    if (this.ref.current === null || this.pagedRef.current === null) {
      throw new Error(`Error ${this.ref} ${this.pagedRef}`);
    }
    const { current } = this.ref;
    let paged = new Previewer();
    console.log(`${current} ${this.pagedRef.current}`);
    await paged.preview(current, ["/css/page.css"], this.pagedRef.current);
    current.style.display = `none`;
  }
  render() {
    const r = require.context("content/", true, /\.mdx$/);
    const components = r
      .keys()
      .map((k: string) => [k, r(k)])
      .map(([k, e]: [string, any]) => [k, e.default])
      .map(([k, e]: [string, any]) => [k, new e({})])
      .map(([k, e]: [string, JSX.Element]) => <div key={k} className="chapter">{e}</div>);
    return (
      <>
        <Head>
          <link rel="stylesheet" href="css/style.css" />
          <link rel="stylesheet" href="css/screen.css" />
          <link rel="stylesheet" href="font/cmu.css" />
          <link rel="stylesheet" href="css/katex.min.css" />
          <link rel="stylesheet" href="css/page.css" />
        </Head>
        <div ref={this.ref}>{components}</div>
        <div ref={this.pagedRef}></div>
      </>
    );
  }
}
