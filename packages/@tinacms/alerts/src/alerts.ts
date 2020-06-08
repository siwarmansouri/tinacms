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

import { EventBus, Callback } from '@tinacms/core'

/**
 * This class provides a helper API for creating Alert Events.
 */
export class Alerts {
  constructor(private events: EventBus) {}

  add(level: AlertLevel, message: string, timeout: number = 3000) {
    const alert = {
      level,
      message,
      timeout,
      id: `${message}|${Date.now()}`,
    }

    this.events.dispatch({ type: 'alert', alert })
  }

  subscribe(cb: Callback) {
    const unsub = this.events.subscribe('alert', cb)

    return () => unsub()
  }

  info(message: string, timeout?: number) {
    return this.add('info', message, timeout)
  }
  success(message: string, timeout?: number) {
    return this.add('success', message, timeout)
  }
  warn(message: string, timeout?: number) {
    return this.add('warn', message, timeout)
  }
  error(message: string, timeout?: number) {
    return this.add('error', message, timeout)
  }
}

export type AlertLevel = 'info' | 'success' | 'warn' | 'error'

export interface Alert {
  id: string
  level: AlertLevel
  message: string
  timeout: number
}
