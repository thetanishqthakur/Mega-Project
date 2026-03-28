import conf from "../conf/conf";

import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createRow(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      );
    } catch (error) {
      console.log("Appwirte service :: createPost :: eoor", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateRow(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        },
      );
    } catch (error) {
      console.log("Appwirte service :: createPost :: eoor", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteRow(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
      );
      return true;
    } catch (error) {
      console.log("Appwirte service :: createPost :: eoor", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getRow(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
      );
    } catch (error) {
      console.log("Appwirte service :: createPost :: eoor", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listRows(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries,
      );
    } catch (error) {
      console.log("Appwirte service :: createPost :: eoor", error);
      return false;
    }
  }

  //    File Upload Method
  async uploadFile(file) {
    try {
      return await this.bucket.createFile({
        bucketId: conf.appwriteBucketId,
        uniqueId: ID.unique(),
        file,
      });
    } catch (error) {
      console.log("Appwirte service :: createPost :: eoor", error);
      return false;
    }
  }

  async deleteFile(fileID) {
    try {
      return await this.bucket.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId: fileID
        
      });
      return true
    } catch (error) {
      console.log("Appwirte service :: createPost :: eoor", error);
      return false;
    }
  }

  getFilePreview(fileId){
    return this.bucket.getFilePreview({
        bucketId: conf.appwriteBucketId,
        fileId: fileId
    }
    )
  }
}

const service = new Service();

export default service;
