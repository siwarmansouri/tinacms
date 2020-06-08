/**

 Copyright 2019 Forestry.io Inc

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 */

import { Alerts } from './alerts'
import { EventBus } from '@tinacms/core'

jest.useFakeTimers()

const events = new EventBus()

describe('Alerts', () => {
  describe('#subscribe(listener)', () => {
    it('does not call listener', () => {
      const listener = jest.fn()
      const alerts = new Alerts(events)

      alerts.subscribe(listener)

      expect(listener).not.toHaveBeenCalled()
    })
    it('listener is called after an `alert` is dispatched', () => {
      const listener = jest.fn()
      const alerts = new Alerts(events)
      alerts.subscribe(listener)

      alerts.add('info', 'Test')

      expect(listener).toHaveBeenCalled()
    })
  })
  describe('alerts.info("Information", 2000)', () => {
    it('calls alerts.add("info", "Information", 2000)', () => {
      const alerts = new Alerts(events)
      alerts.add = jest.fn()

      alerts.info('Information', 2000)

      expect(alerts.add).toHaveBeenCalledWith('info', 'Information', 2000)
    })
  })
  describe('alerts.success("Hooray!", 6000)', () => {
    it('calls alerts.add("success", "Hooray!", 6000)', () => {
      const alerts = new Alerts(events)
      alerts.add = jest.fn()

      alerts.success('Hooray!', 6000)

      expect(alerts.add).toHaveBeenCalledWith('success', 'Hooray!', 6000)
    })
  })
  describe('alerts.warn("Warning", 40)', () => {
    it('calls alerts.add("warn", "Warning", 40)', () => {
      const alerts = new Alerts(events)
      alerts.add = jest.fn()

      alerts.warn('Warning', 40)

      expect(alerts.add).toHaveBeenCalledWith('warn', 'Warning', 40)
    })
  })
  describe('alerts.error("Error", 560)', () => {
    it('calls alerts.add("error", "Error", 560)', () => {
      const alerts = new Alerts(events)
      alerts.add = jest.fn()

      alerts.error('Error', 560)

      expect(alerts.add).toHaveBeenCalledWith('error', 'Error', 560)
    })
  })
})
