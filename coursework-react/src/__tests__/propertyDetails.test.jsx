import React from "react";
import { render, screen } from "@testing-library/react";
import PropertyDetails from "../components/PropertyDetails";

describe("PropertyDetails", () => {
  test("renders map iframe", () => {
    const property = {
      id: "prop1",
      title: "Test property",
      type: "House",
      price: 123000,
      location: "London",
      description: "Nice place",
      images: ["/a.jpg"],
      bedrooms: 2,
      bathrooms: 1,
      added: "2024-01-01",
      map: "https://maps.google.com",
    };

    render(
      <PropertyDetails
        property={property}
        onBack={() => {}}
        onFavourite={() => {}}
        isFavourite={false}
      />
    );

    expect(screen.getByTitle(/google map/i)).toBeInTheDocument();
  });

  test("shows back button", () => {
    const property = {
      id: "prop1",
      title: "Test property",
      type: "House",
      price: 123000,
      location: "London",
      description: "Nice place",
      images: ["/a.jpg"],
      bedrooms: 2,
      bathrooms: 1,
      added: "2024-01-01",
      map: "https://maps.google.com",
    };

    render(
      <PropertyDetails
        property={property}
        onBack={() => {}}
        onFavourite={() => {}}
        isFavourite={false}
      />
    );

    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
  });
});