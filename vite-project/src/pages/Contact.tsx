import { Component } from "react";

import { Text } from "../components/Text";

export default class Contact extends Component {
  render() {
    return (
      <section className="min-h-screen bg-slate-100 px-4 py-12">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-xl">
          <Text type="h1">Никуда не пишите!</Text>
          <Text type="p" className="mt-4">
            Сидите и нойте.
          </Text>
        </div>
      </section>
    );
  }
}
