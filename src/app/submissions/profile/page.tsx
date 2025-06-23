import SectionWrapper from '@/components/layout/SectionWrapper';
import { FC } from 'react';

export interface PageProps {

}


const FIELDS = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    required: true,
  },
  {
    label: 'Date of birth',
    name: 'date_of_birth',
    type: 'date',
  },

  {
    label: 'Email',
    name: 'email',
    type: 'email',
    required: true,
  },
  {
    label: 'Gender',
    name: 'gender',
    type: 'select',
    required: true,
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Other', value: 'other' },
    ],
  },
  {
    label: 'Genre',
    hint: 'Please enter your genre(s) separated by commas',
    name: 'genre',
    type: 'text',
    required: true,
  },
  {
    label: 'Bio',
    name: 'bio',
    type: 'textarea',
    required: true,
  }
]

const inputClass = 'mt-1 block w-full rounded-md border p-1 boxy-card focus:border-gray-500 focus:ring-0 bg-transparent';
const Page: FC<PageProps> = (props) => {

  return (
    <main className="min-h-screen py-4 md:py-8">
      <SectionWrapper>
        <h1 className="text-4xl font-bold text-center">Profile</h1>
        <p className="text-center text-gray-500 mb-8">
          Please fill out the form below to submit your profile.
        </p>
        <form
          className="flex flex-col gap-4 max-w-lg mx-auto"
          action="https://formspree.io/f/xqabyljl"
          // encType="multipart/form-data"
          method="POST"
        >

          {FIELDS.map((field) => (
            <label className="block">
              <span className="text-gray-700">{field.label}
                <br />
                {field.hint && <span className="text-gray-500 text-sm">{field.hint}</span>}</span>
              {field.type === 'text' && (
                <input
                  required={field.required}
                  type="text"
                  name={field.name}
                  className={inputClass}
                />
              )}
              {field.type === 'date' && (
                <input
                  required={field.required}
                  type="date"
                  name={field.name}
                  className={inputClass}
                />
              )}
              {field.type === 'email' && (
                <input
                  required={field.required}
                  type="email"
                  name={field.name}
                  className={inputClass}
                />
              )}
              {field.type === 'select' && (
                <select
                  required={field.required}
                  name={field.name}
                  className={inputClass}
                >
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              )}
              {field.type === 'textarea' && (
                <textarea
                  required={field.required}
                  rows={10}
                  name={field.name}
                  className={inputClass}
                />
              )}
              {field.type === 'file' && (
                <input
                  required={field.required}
                  type="file"
                  name={field.name}
                  className={inputClass}
                  accept="image/*"
                />
              )}
            </label>
          ))}
          <button
            type="submit"
            className="boxy-button"
          >
            Submit
          </button>
        </form>
      </SectionWrapper>
    </main>
  )
}


export default Page;