import { ComponentSettings, Manager, MCEvent } from '@managed-components/types'
import { omitNullish } from './utils'

const TRACK_URL = 'https://bat.bing.com/action/0'
const CLICK_ID_PARAM = 'msclkid'
const ONE_MONTH = (1000 * 60 * 60 * 24 * 365) / 12

const getECParams = (event: MCEvent) => {
  const { payload: initialPayload, name } = event
  const { ecommerce: payload } = initialPayload

  const data: any = {
    ec: 'ecommerce',
    gc: payload.currency,
    gv: payload.revenue || payload.total || payload.value,
  }

  switch (name) {
    case 'Order Completed':
      data.ea = 'purchase'
      data.el = payload.order_id || payload.checkout_id || payload.product_id
      data.ev = payload.revenue || payload.total || payload.value
      break
    case 'Product Added':
      data.ea = 'add_to_cart'
      data.el =
        payload.name ||
        payload.product_id ||
        payload.sku ||
        payload.products?.map((p: any) => p.name).join()
      data.ev = payload.price || payload.total || payload.value
      data.gv = payload.price || data.gv
      break
    case 'Checkout Started':
      data.ea = 'begin_checkout'
      data.el = payload.checkout_id || payload.order_id || payload.product_id
      data.ev = payload.revenue || payload.total || payload.value
      break
    case 'Subscribe':
      data.ea = 'subscribe'
      data.el = payload.order_id || payload.checkout_id || payload.product_id
      data.ev = payload.revenue || payload.total || payload.value
      break
    default:
      data.ea = name
      data.el =
        payload.order_id ||
        payload.checkout_id ||
        payload.product_id ||
        payload.name ||
        payload.products?.map((p: any) => p.name).join()
      data.ev =
        payload.revenue || payload.total || payload.value || payload.price
  }
  return data
}

const getStandardParams = (
  event: MCEvent,
  settings: ComponentSettings,
  ec: boolean
) => {
  const { payload: initialPayload } = event
  let payload
  if (ec) {
    const { products, ...restOfPayload } = initialPayload.ecommerce
    payload = restOfPayload
  } else {
    payload = initialPayload
  }

  const returnPayload = omitNullish({
    ...payload,
    ti: payload.ti || settings.ti,
    tl: event.client.title || '',
    rn: (+(Math.random() * 1000000)).toString(),
    sw: event.client.screenWidth,
    sh: event.client.screenHeight,
    lg: (event.client.language || '').split(',')[0].trim(),
    p: event.client.url.href,
    Ver: '2',
    mid: crypto.randomUUID(),

    // TODO - how do we want to handle screen color?
    // sc: system.device.colors,
  })

  return returnPayload
}

const handleEvent =
  (settings: ComponentSettings, ec = false) =>
  async (event: MCEvent) => {
    const payload = !ec
      ? getStandardParams(event, settings, ec)
      : {
          ...getStandardParams(event, settings, ec),
          ...getECParams(event),
        }

    // Handle Bing click id
    // Click id can come from two places:
    // 1- The URL on landing page after clicking on a Microsoft Ad
    // it must then be stored in a first-party cookie
    // 2- the previously created first party cookie
    // in addition, a suffix gets added to the mscklid param sent to Bing
    // to determine if user saw multiple ads

    // if no click id param or existing cookie => mscklid param = N
    // if msclkid cookie value and param values differ => mscklid = param one + suffix = 1
    // if msclkid cookie value and param values are equal = mscklid + suffix = 0
    let suffix = 'N'

    if (event.client.url.searchParams.get(CLICK_ID_PARAM)) {
      suffix =
        event.client.url.searchParams.get(CLICK_ID_PARAM) ===
        event.client.get(CLICK_ID_PARAM)
          ? '0'
          : '1'

      event.client.set(
        CLICK_ID_PARAM,
        event.client.url.searchParams.get(CLICK_ID_PARAM),
        { expiry: 3 * ONE_MONTH }
      )
    }

    const clkid = event.client.get(CLICK_ID_PARAM)
    payload[CLICK_ID_PARAM] = `${clkid ? [clkid, suffix].join('-') : suffix}`

    if (Object.keys(payload).length) {
      const params = new URLSearchParams(payload).toString()
      event.client.fetch(`${TRACK_URL}?${params}`)
    }
  }

export default async function (manager: Manager, settings: ComponentSettings) {
  manager.addEventListener('pageview', handleEvent(settings))
  manager.addEventListener('event', handleEvent(settings))
  manager.addEventListener('ecommerce', handleEvent(settings, true))
}
