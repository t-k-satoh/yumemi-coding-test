import { action } from '@storybook/addon-actions'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

import { Home } from '..'
import { Props } from '../types'
import { populationData } from './population-data'
import { prefecturesData } from './prefectures-data'

const props: Props = {
  prefecturesData,
  prefecturesDataStatus: 'idle',
  prefecturesDataError: undefined,
  prefCodesOnQuery: [],
  populationData,
  populationDataIsFetching: false,
  populationDataErrors: [],
  onChangePrefCodes: action('onChangePrefCodes'),
}

export default {
  title: `pages/${Home.name}`,
  component: Home,
  argTypes: {
    prefecturesDataError: { control: 'color' },
  },
} as ComponentMeta<typeof Home>

const Template: ComponentStory<typeof Home> = (args) => <Home {...args} />

export const Default = Template.bind({})
Default.args = props
