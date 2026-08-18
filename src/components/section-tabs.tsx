"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { About } from "@/components/sections/about";
import { Resume } from "@/components/sections/resume";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";

const sections = [
  { value: "about", label: "About", Panel: About },
  { value: "resume", label: "Resume", Panel: Resume },
  { value: "portfolio", label: "Portfolio", Panel: Projects },
  { value: "contact", label: "Contact", Panel: Contact },
] as const;

type SectionValue = (typeof sections)[number]["value"];

const DEFAULT_SECTION: SectionValue = "about";

function isSectionValue(value: string): value is SectionValue {
  return sections.some((section) => section.value === value);
}

/**
 * Section-tab navigation for the main content area: About / Resume /
 * Portfolio / Contact, shown one at a time instead of stacked in a long
 * scroll. The active tab is kept in sync with the URL hash for
 * deep-linking, without a full page navigation.
 */
export function SectionTabs() {
  const [value, setValue] = useState<SectionValue>(DEFAULT_SECTION);

  // Read the initial hash after mount (no `window` during SSR) so a link
  // like `/#portfolio` opens straight to that tab.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (isSectionValue(hash)) {
      setValue(hash);
    }
  }, []);

  function handleValueChange(next: unknown) {
    if (typeof next !== "string" || !isSectionValue(next)) return;
    setValue(next);
    window.history.replaceState(null, "", `#${next}`);
  }

  return (
    <Tabs value={value} onValueChange={handleValueChange}>
      <TabsList aria-label="Portfolio sections">
        {sections.map((section) => (
          <TabsTab key={section.value} value={section.value}>
            {section.label}
          </TabsTab>
        ))}
      </TabsList>

      {sections.map(({ value: sectionValue, Panel }) => (
        <TabsPanel key={sectionValue} value={sectionValue} keepMounted>
          <Panel />
        </TabsPanel>
      ))}
    </Tabs>
  );
}
