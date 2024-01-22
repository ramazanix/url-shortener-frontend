import { urlsService } from '@/services'
import { permanentRedirect } from 'next/navigation'

export default async function RedirectPage({
  params,
}: {
  params: { short_name: string }
}) {
  await urlsService.urls.get(params.short_name!).then((res) => {
    permanentRedirect(res.data.full_name)
  })
}
