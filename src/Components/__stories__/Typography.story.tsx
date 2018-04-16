import { storiesOf } from "@storybook/react"
import React from "react"

import colors from "../../Assets/Colors"
import Text from "../Text"
import TextLink from "../TextLink"
import Title from "../Title"

storiesOf("Typography", module)
  .add("Headings", () => (
    <div>
      <Title titleSize="xxlarge">XXLarge Title: 72px</Title>
      <Title titleSize="xlarge">XLarge Title: 50px</Title>
      <Title titleSize="large" fontWeight="bold">
        Large Title: 37px, Bold
      </Title>
      <Title titleSize="medium">Medium Title: 30px</Title>
      <Title titleSize="small">Small Title: 25px</Title>
      <Title titleSize="xsmall" fontWeight="bold">
        Small Title: 25px, Bold
      </Title>
      <Title titleSize="xxsmall">XXSmall Title: 13px</Title>
    </div>
  ))
  .add("Text", () => (
    <div>
      <Title>Plain Text</Title>

      <Text textSize="xlarge">
        Xlarge text: Thank you for your interest in the program.
      </Text>
      <Text textSize="large">
        Large text: Thank you for your interest in the program.
      </Text>
      <Text>Small text: Thank you for your interest in the program.</Text>

      <Title>Fonts</Title>

      <Text textStyle="primary">ITC Avant Garde Gothic W04</Text>
      <Text textStyle="secondary">Adobe Garamond W08</Text>

      <Title>Alignment</Title>

      <Text>
        Thank you for your interest in the program.<br />
        Have questions? Get in touch
      </Text>
      <Text align="center">
        Thank you for your interest in the program.<br />
        Have questions? Get in touch
      </Text>
      <Text align="end">
        Thank you for your interest in the program.<br />
        Have questions? Get in touch
      </Text>

      <Title>Text Color</Title>

      <Title color={colors.graySemibold}>Contact Us</Title>

      <Text align="center" color={colors.graySemibold}>
        Have questions? Get in touch:&nbsp;
        <TextLink href="#">youremail@example.com</TextLink>
      </Text>
    </div>
  ))
