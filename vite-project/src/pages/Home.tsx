import { Component } from "react";

type ServerData = {
  message: string;
  title: string;
  price: number;
};

type StateType = {
  data: ServerData | null;
};

export default class Home extends Component<object, StateType> {
  state: StateType = {
    data: null
  };

  async componentDidMount() {
    try {
      const response = await fetch("http://localhost:5000/api/data");
      const result: ServerData = await response.json();
      this.setState({ data: result });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  render() {
    return (
      <section className="min-h-screen bg-slate-100 px-4 py-12">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Добро пожаловать в онлайн-магазин Scrudge!
            </h1>

            <p className="mt-4 text-lg">
              Здесь вы найдёте широкий ассортимент всякой пали.
            </p>
          </div>

          <div className="mt-8">
            {this.state.data ? (
              <div className="rounded-2xl border p-6 shadow">
                <p className="text-lg">{this.state.data.message}</p>
                <h2 className="mt-2 text-2xl font-bold">
                  {this.state.data.title}
                </h2>
                <p className="mt-2 text-xl">
                  Цена: {this.state.data.price} руб.
                </p>
              </div>
            ) : (
              <p>Загрузка данных с сервера...</p>
            )}
          </div>
        </div>
      </section>
    );
  }
}