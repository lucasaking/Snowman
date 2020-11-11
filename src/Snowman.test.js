import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman";

// it("works when you click on the right arrow", function () {
//   const { queryByTestId, queryByAltText } = render(<Carousel />);

//   // expect the first image to show, but not the second
//   expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
//   expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

//   // move forward in the carousel
//   const rightArrow = queryByTestId("right-arrow");
//   fireEvent.click(rightArrow);

//   // expect the second image to show, but not the first
//   expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
//   expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
// });

const MAX_WRONG = 6;

it("renders without crashing", function () {
  // this is a low-value test, but better than nothing
  render(<Snowman
    maxWrong={MAX_WRONG}
    images="6.png"
    words={"apple"}
  />);
});

it("matches snapshot", function () {
  const { container } = render(<Snowman
    maxWrong={6}
    images="6.png"
    words={"apple"}
  />);
  expect(container).toMatchSnapshot();
});

it("renders crashes after 6 guesses", function () {
  // the app continues to show images after maxGuesses
  
  const { container, getByText } = render(<Snowman maxWrong={1}/>);
  fireEvent.click(getByText("r"));
  getByText("You lose!");
  getByText("apple");

  expect(container).toMatchSnapshot();
});
