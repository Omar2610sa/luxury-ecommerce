import Link from "next/link"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function BreadCrumb({ secondLink, thirdLink }: { secondLink?: string; thirdLink?: string }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink className="text-lg" href="/">
              الرئيسية
          </BreadcrumbLink>
        </BreadcrumbItem>
        {
          secondLink && (
            <>
              <BreadcrumbSeparator className="text-xl">
                /
              </BreadcrumbSeparator>

              <BreadcrumbItem>
                <BreadcrumbLink href={`/categories/${secondLink}`} className="text-lg">
                    {secondLink}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
        {
          thirdLink && (
            <>
        <BreadcrumbSeparator className="text-xl">
          /
        </BreadcrumbSeparator>

        <BreadcrumbItem>
          <BreadcrumbPage className="text-lg font-semibold">
            {thirdLink}
          </BreadcrumbPage>
        </BreadcrumbItem>
        </>
          )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
