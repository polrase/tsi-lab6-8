import { Component } from "react";

import { Text } from "../components/Text";

export default class About extends Component {
  render() {
    return (
      <section className="min-h-screen bg-slate-100 px-4 py-12">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-xl">
          <Text type="h1">О нас</Text>
          <Text type="p" className="mt-4">
            Мы соберём с вас деньги и экзитскамнемся.
          </Text>
        </div>
      </section>
    );
  }
}
