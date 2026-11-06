# Accessibility audit

This audit records the accessibility issues found in the rendered Championship Day page.
The visual layout, existing event information, mouse interactions, and available views were preserved.

## 1. Schedule filters were not keyboard controls

**What I found:** The filters looked like buttons, but were implemented as `div` elements. They did not have native button keyboard behaviour.

**User impact:** Keyboard-only users could have difficulty reaching and activating all three filters.

**WCAG 2.1:** 2.1.1 Keyboard (Level A)

**Recommended fix:** Use native `button` elements and expose the selected state with `aria-pressed`.

**Status:** Fixed. A test checks keyboard access to all filters.

## 2. Results table had no heading for the Athlete column

**What I found:** The Athlete column had an empty table header.

**User impact:** Screen-reader users could not reliably identify the athlete names when navigating the table.

**WCAG 2.1:** 1.3.1 Info and Relationships (Level A)

**Recommended fix:** Add a descriptive `Athlete` heading to the previously unlabelled column, using the existing athlete data.

**Status:** Fixed.

## 3. Result status depended on colour

**What I found:** The Status column displayed only a dash while the result state was communicated through background colour.

**User impact:** Users who cannot see or distinguish the colours could not identify whether an athlete was qualified or eliminated.

**WCAG 2.1:** 1.4.1 Use of Color (Level A)

**Recommended fix:** Display the existing `Qualified` or `Eliminated` text in addition to the colour styling.

**Status:** Fixed. A test checks that both statuses are rendered as text.

## 4. Icon-only favourite control had no accessible name

**What I found:** The favourites star button contained only an icon and had no accessible name.

**User impact:** Screen-reader users could find the button but would not know what action it performs.

**WCAG 2.1:** 4.1.2 Name, Role, Value (Level A)

**Recommended fix:** Give it a state-specific name such as `Add to favourites` or `Remove from favourites`.

**Status:** Fixed.

## 5. Alert dialog was not labelled by its heading

**What I found:** The alert preferences dialog had a visible heading but did not associate that heading with the dialog role.

**User impact:** Screen-reader users may not hear what the dialog is about when it opens.

**WCAG 2.1:** 4.1.2 Name, Role, Value (Level A)

**Recommended fix:** Reference the heading with the dialog's `aria-labelledby` attribute.

**Status:** Fixed.

## 6. Informative course image had empty alternative text

**What I found:** The course image contained meaningful text, but its `alt`
attribute was empty.

**User impact:** Screen-reader users could miss the course information shown
inside the image.

**WCAG 2.1:** 1.1.1 Non-text Content (Level A)

**Recommended fix:** Provide a concise text alternative containing the
important information represented by the image.

**Status:** Fixed. A test checks that the image has an accessible name.

## Behaviours checked and found correct

- Schedule filters are buttons, so `Tab` moves between them and `Enter` or `Space` activates them. Arrow keys are not required for ordinary buttons.
- Native checkboxes are toggled with `Space`, not normally with `Enter`.
- Table data cells do not need to be individually reachable with `Tab`.
- The initial selected filter remains `All sessions`.
