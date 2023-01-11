import { ComponentSettings, Manager, MCEvent } from '@managed-components/types'

const TRACK_URL = 'https://bat.bing.com/action/0'

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
  return {
    ti: (ec ? event.payload.ecommerce.ti : event.payload.ti) || settings.ti,
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
  }
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
