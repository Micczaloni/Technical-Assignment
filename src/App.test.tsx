import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { App } from "./App";

describe("Championship Day", () => {
	it("renders the page heading", () => {
		render(<App />);

		expect(
			screen.getByRole("heading", { level: 1, name: "Championship Day" }),
		).toBeInTheDocument();
	});

	it("shows every heat on the schedule", () => {
		render(<App />);

		expect(screen.getByText("Heat 1")).toBeInTheDocument();
		expect(screen.getByText("Heat 2")).toBeInTheDocument();
		expect(screen.getByText("Heat 3")).toBeInTheDocument();
	});

	it("shows finished sessions when Finished is chosen", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(screen.getByRole("button", { name: "Finished" }));

		expect(screen.getByText("Heat 2")).toBeInTheDocument();
		expect(screen.queryByText("Heat 1")).not.toBeInTheDocument();
	});

	it("marks All sessions as the initially selected filter", () => {
		render(<App />);

		expect(
			screen.getByRole("button", { name: "All sessions" }),
		).toHaveAttribute("aria-pressed", "true");
	});

	it("allows all schedule filters to be reached and activated with the keyboard", async () => {
		const user = userEvent.setup();
		render(<App />);

		const liveOnly = screen.getByRole("button", { name: "Live only" });
		liveOnly.focus();
		expect(liveOnly).toHaveFocus();

		await user.tab();
		expect(screen.getByRole("button", { name: "All sessions" })).toHaveFocus();

		await user.tab();
		expect(screen.getByRole("button", { name: "Finished" })).toHaveFocus();

		await user.keyboard("{Enter}");
		expect(screen.getByRole("button", { name: "Finished" })).toHaveAttribute(
			"aria-pressed",
			"true",
		);
		expect(screen.getByText("Heat 2")).toBeInTheDocument();
	});

	it("shows an athlete when Results is chosen", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(screen.getByRole("tab", { name: "Results" }));

		expect(screen.getByText("Lena Berg")).toBeInTheDocument();
	});

	it("shows result status as text, not only as a colour", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(screen.getByRole("tab", { name: "Results" }));

		expect(screen.getAllByText("Qualified")).toHaveLength(2);
		expect(screen.getAllByText("Eliminated")).toHaveLength(2);
	});

	it("provides a heading for the Athlete results column", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(screen.getByRole("tab", { name: "Results" }));

		expect(
			screen.getByRole("columnheader", { name: "Athlete" }),
		).toBeInTheDocument();
	});

	it("gives the result sorting buttons accurate accessible names", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(screen.getByRole("tab", { name: "Results" }));

		expect(
			screen.getByRole("button", { name: "Sort by rank" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Sort by bib" }),
		).toBeInTheDocument();
	});

	it("gives the star control an accessible name", () => {
		render(<App />);

		expect(
			screen.getByRole("button", { name: "Add to favourites" }),
		).toBeInTheDocument();
	});

	it("updates the star control name when favourites are toggled", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(screen.getByRole("button", { name: "Add to favourites" }));

		expect(
			screen.getByRole("button", { name: "Remove from favourites" }),
		).toBeInTheDocument();
	});

	it("shows the medal ceremonies note when Medals is chosen", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(screen.getByRole("tab", { name: "Medals" }));

		expect(
			screen.getByText("Medal ceremonies are published after the final heat."),
		).toBeInTheDocument();
	});

	it("shows the heat detail when Details is activated", async () => {
		const user = userEvent.setup();
		render(<App />);

		const [heatOneDetails] = screen.getAllByRole("button", { name: "Details" });
		if (heatOneDetails === undefined) {
			throw new Error("Expected a Details control");
		}

		await user.click(heatOneDetails);

		expect(screen.getByText("First run starts at 10:15.")).toBeInTheDocument();
	});

	it("opens and closes alert preferences", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(screen.getByRole("button", { name: "Manage alerts" }));
		expect(screen.getByText("Heat changes")).toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: "Close" }));
		expect(screen.queryByText("Heat changes")).not.toBeInTheDocument();
	});

	it("labels the alert dialog and toggles checkboxes with Space", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(screen.getByRole("button", { name: "Manage alerts" }));

		expect(
			screen.getByRole("dialog", { name: "Alert preferences" }),
		).toBeInTheDocument();

		const heatChanges = screen.getByRole("checkbox", { name: "Heat changes" });
		expect(heatChanges).not.toBeChecked();

		heatChanges.focus();
		await user.keyboard(" ");
		expect(heatChanges).toBeChecked();
	});

	it("shows a confirmation when the share control is used", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(screen.getByRole("button", { name: "Menu" }));

		expect(screen.getByText("Link copied")).toBeInTheDocument();
	});
});
