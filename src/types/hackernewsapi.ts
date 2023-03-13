export type Story = {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
};

export type User = {
    about: string;
    created: number;
    delay: number;
    id: string;
    karma: number;
    submitted: number[];
}

export type TopStories = number[];