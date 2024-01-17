'use client'

import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile"
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
interface categoryType {
  _id: string,
  name: string,
}

function CategoriesPage() {
  const [categoryName, setCategoryName] = useState('')
  const [categories, setCategories] = useState<[categoryType] | null>()
  const [editedCategory, setEditedCategory] = useState<categoryType | null>(null)
  const { loading, data } = useProfile();
  async function fetchCategories() {
    await fetch('/api/categories')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        return response.json();
      })
      .then((response) => {
        setCategories(response);
        console.log(response)
      })
      .catch((error) => {
        console.error(error);
      });
      
        setEditedCategory(null)
        setCategoryName('')
  }


  useEffect(() => {
    fetchCategories();
  }, []);
  if (loading) {
    return 'Loading....'
  }
  if (data.isAdmin) {
    return 'Not an Admin'
  }



  async function handleCategorySubmit(e: FormEvent) {
    e.preventDefault();
    const data: { name: string; _id?: string } = { name: categoryName }
    if (editedCategory) {
      data._id = editedCategory._id
    }
    await toast.promise(
      fetch('/api/categories', {
        method: editedCategory ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then((response) => {
          if (response.ok)
            return Promise.resolve();
          else
            return Promise.reject();
        }),
      {
        loading: editedCategory ? `Updating ${editedCategory.name}...` : 'Creating new category',
        success: `Category ${editedCategory ? 'updated' : 'created'}`,
        error: `Error in ${editedCategory ? 'updated' : 'created'} category`
      }
    );
    setEditedCategory(null)
      setCategoryName('')
    fetchCategories()
  }
  const toggleEditState = (c:categoryType) => {
    if (editedCategory === c) {
      setEditedCategory(null);
      setCategoryName('');
    } else {
      setEditedCategory(c);
      setCategoryName(c.name);
    }
  }
  async function handleDeleteCategory(c:categoryType){
    if (c) {
      await toast.promise(
        fetch('/api/categories', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(c)
        })
        .then((response) => {
          if (response.ok)
          return Promise.resolve();
        else
        return Promise.reject();
    }),
    {
      loading: 'Deleting category',
      success: 'Category deleted',
      error: 'Error in deleting category'
    }
    );
    fetchCategories()

  }
  }


  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={true} />
      <form onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>{editedCategory ? (`Update category: ${editedCategory.name}`) : 'New category'}</label>
            <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
          </div>
          <div className="pb-2">
            <button type="submit" >{editedCategory ? 'Update' : 'Create'}</button>
          </div>
        </div>
      </form>
      {categories && (<h2 className="mt-8 text-sm text-gray-500">Edit Categories</h2>)}
      {categories && categories.map(c => (
        <div  key={c._id} className="flex gap-2">
        <button onClick={() => toggleEditState(c)} className="bg-gray-200 rounded-xl p-2 px-4 
        cursor-pointer mb-2">
          {c.name}
        </button>
        <button type="button" onClick={() => handleDeleteCategory(c)} className="bg-red-500 text-white rounded-xl p-2 px-4 mb-2 w-auto">Delete</button>
          </div>
      ))}
    </section>
  )
}

export default CategoriesPage