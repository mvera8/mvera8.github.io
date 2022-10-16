import { useState } from 'react';
import { AddCategory, GifGrid } from './components';

export const MVGifs = () => {

	const [ categories, setCategories] = useState([]);

	const onAddCategory = ( newCategory ) => {
		if ( categories.includes( newCategory ) || '' === newCategory ) return;

		setCategories([ newCategory, ...categories ]);
	}

	return (
		<>
			<AddCategory onNewCategory={ onAddCategory } />

			<hr />

			<input
				type='button'
				className='btn btn-primary'
				value='The Office'
			/>

			<div className='row'>
				{
					categories.map( category => (
						<GifGrid
							key={ category }
							category={ category }
						/>
					))
				}
			</div>
		</>
	)
}