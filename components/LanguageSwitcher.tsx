'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import Cookies from "js-cookie"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ChevronDownIcon } from 'lucide-react';
import Image from 'next/image';

import flagAr from '@/assets/icons/saudia.png';
import flagEn from '@/assets/icons/english(3-5).svg';



export function LanguageSwitcher() {

  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('language');


  const languages = [
    { code: 'ar', label: t('ar'), flag: flagAr },
    { code: 'en', label: t('en'), flag: flagEn },
  ];

  const currentLanguage = languages.find(lang => lang.code === currentLocale);

  const handleLanguageChange = (newLocale: string) => {
    // Replace the locale in the pathname
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname);
    Cookies.set("NEXT_LOCALE", newLocale)
    setIsOpen(false);
  };



  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false} >
      <DropdownMenuTrigger className="flex items-center gap-1 cursor-pointer ">
        <Image
          src={currentLanguage?.flag}
          alt="flag"
          className="size-7 ml-2 object-contain rounded-xs"
        />
        <span className='hidden md:block'>
          {currentLanguage?.label}
        </span>
        <ChevronDownIcon className="size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className=' mt-2'>
        <DropdownMenuGroup>
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              disabled={lang.code === currentLocale}
            >
              <Image
                src={lang.flag}
                alt={`flag-${lang.code}`}
                className="size-7 ml-2 object-contain rounded-xs"
              />
              {lang.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
