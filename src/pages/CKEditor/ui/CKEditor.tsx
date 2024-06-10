
import Editor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor as CKEditorComponent } from "@ckeditor/ckeditor5-react";
import { FlexWrapper } from "../../../shared/ui/flexWrapper/FlexWrapper";
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import './style.scss'

class MyUploadAdapter {
	loader: any;
    constructor(loader: any) {
        // CKEditor 5's FileLoader instance.
        this.loader = loader;
    }

    // Starts the upload process.
    upload() {
        return this.loader.file
            .then((file: string | Blob) => new Promise((resolve, reject) => {
                // Your code here to send `file` to your server using form data and fetch API
                // Or using any other method, axios for example

                const data = new FormData();
                data.append('upload', file);
                
                fetch('your server upload URL', {
                    method: 'POST',
                    body: data
                })
                .then(response => response.json())
                .then(data => {
                    if (data && data.url) {
                        resolve({
                            default: data.url
                        });
                    } else {
                        reject('Upload failed');
                    }
                });
            }));
    }

    abort() {
        // Method to abort upload, not really needed in this example
        // Reject promise in upload() method logic instead
    }
}

// Function to be used in `init` callback where the `editor` is a CKEditor 5 instance.
export function MyCustomUploadAdapterPlugin(editor: { plugins: { get: (arg0: string) => { (): any; new(): any; createUploadAdapter: (loader: any) => MyUploadAdapter; }; }; }) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
        // Configure the URL to the upload script in your back-end here!
        return new MyUploadAdapter(loader);
    };
}

export function CKEditor() {
	return (
		<FlexWrapper section>

			<CKEditorComponent
				editor={Editor}
				data="<p>Hello from CKEditor&nbsp;5!</p>"
		config={{
			extraPlugins: [MyCustomUploadAdapterPlugin],

		}}
				onReady={(editor) => {
					// You can store the "editor" and use when it is needed.
					console.log("Editor is ready to use!", editor);
				}}
				onChange={(event) => {
					console.log(event);
				}}
				onBlur={(event, editor) => {
					console.log("Blur.", editor);
				}}
				onFocus={(event, editor) => {
					console.log("Focus.", editor);
				}}
			/>
		</FlexWrapper>
	);
}
