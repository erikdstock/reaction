import {
  ContactForPriceWork,
  FoSaleArtworkNoEditions,
  FoSaleArtworkWithMultipleEditions,
  FoSaleArtworkWithOneEdition,
} from "Apps/__test__/Fixtures/Artwork/Sidebar/Commercial"
import { ArtworkSidebarCommercial as Commercial } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarCommercial"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { RelayStubProvider } from "Utils/RelayStubProvider"

storiesOf("Styleguide/Artwork/Sidebar", module)
  .addDecorator(story => <RelayStubProvider>{story()}</RelayStubProvider>)
  .add("Commercial", () => {
    return (
      <React.Fragment>
        <Section title="For sale artwork with no editions">
          <Commercial artwork={FoSaleArtworkNoEditions as any} />
        </Section>
        <Section title="For sale artwork with one edition set">
          <Commercial artwork={FoSaleArtworkWithOneEdition as any} />
        </Section>
        <Section title="For sale artwork with multiple edition sets">
          <Commercial artwork={FoSaleArtworkWithMultipleEditions as any} />
        </Section>
        <Section title="Contact for price work">
          <Commercial artwork={ContactForPriceWork as any} />
        </Section>
      </React.Fragment>
    )
  })
